// Visitor counter using CountAPI (no credentials required)
// Increments on page load and displays a floating widget

(function() {
    const NAMESPACE = 'hackqori'; // puedes cambiar si quieres personalizar
    const KEY = 'visitor_count';
    const COUNTAPI_BASE = 'https://api.countapi.xyz';
    const COUNT_TTL = 24 * 60 * 60 * 1000; // 24 horas
    const COUNT_STORAGE_KEY = 'hackqori_counted_at';

    function createWidget() {
        const wrapper = document.createElement('button');
        wrapper.type = 'button';
        wrapper.className = 'visitor-counter';
        wrapper.setAttribute('aria-label', 'Contador de visitas');

        wrapper.innerHTML = `
            <span class="vc-icon">\u{1F4C8}</span>
            <span class="vc-text">
                <span class="vc-count">...</span>
                <span class="vc-label">Visitas</span>
            </span>
        `;

        // click behavior: briefly show details or copy count
        wrapper.addEventListener('click', () => {
            const countEl = wrapper.querySelector('.vc-count');
            if (!countEl) return;
            const text = `Visitas: ${countEl.textContent}`;
            // copiar al portapapeles
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(() => {
                    showTempTooltip(wrapper, 'Copiado al portapapeles');
                }, () => {
                    showTempTooltip(wrapper, 'Copiado');
                });
            } else {
                showTempTooltip(wrapper, 'Copiado');
            }
        });

        // ensure fixed positioning so we can place it near the backToTop button
        wrapper.style.position = 'fixed';
        wrapper.style.zIndex = '11000';

        document.body.appendChild(wrapper);

        // Try to position the widget next to the backToTop button
        computePositionRelativeToBackButton(wrapper);

        // Recompute on resize/scroll to keep it aligned
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => computePositionRelativeToBackButton(wrapper), 120);
        });
        window.addEventListener('scroll', () => {
            // small throttle
            if (resizeTimer) return;
            resizeTimer = setTimeout(() => {
                computePositionRelativeToBackButton(wrapper);
                resizeTimer = null;
            }, 150);
        });

        return wrapper;
    }

    // Calcula la posición del widget para colocarlo junto al botón #backToTop.
    function computePositionRelativeToBackButton(wrapper) {
        try {
            const back = document.getElementById('backToTop');
            // Default offsets if button not found
            const defaultBottom = 24; // px
            const defaultRight = 24; // px

            if (!back) {
                wrapper.style.right = `${defaultRight}px`;
                wrapper.style.bottom = `${defaultBottom}px`;
                return;
            }

            const backRect = back.getBoundingClientRect();
            const wrapperRect = wrapper.getBoundingClientRect();
            const gap = 12; // px gap between button and counter

            // Distance from viewport right edge to back button's left edge
            const right = Math.max(8, Math.round(window.innerWidth - backRect.left + gap));

            // Align vertically: compute bottom so centers match
            const bottom = Math.max(8, Math.round((window.innerHeight - backRect.bottom) + (wrapperRect.height / 2)));

            wrapper.style.right = `${right}px`;
            wrapper.style.bottom = `${bottom}px`;
        } catch (e) {
            // fallback
            wrapper.style.right = '24px';
            wrapper.style.bottom = '24px';
        }
    }

    async function incrementCounter() {
        const url = `${COUNTAPI_BASE}/hit/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo obtener contador');
        return response.json(); // {value: number, ...}
    }

    async function getCounter() {
        const url = `${COUNTAPI_BASE}/get/${encodeURIComponent(NAMESPACE)}/${encodeURIComponent(KEY)}`;
        const response = await fetch(url, { cache: 'no-store' });
        if (!response.ok) throw new Error('No se pudo obtener contador');
        return response.json(); // {value: number, ...}
    }

    function formatNumber(n) {
        // friendly format with separators
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    function animateCount(el, from, to) {
        let start = from;
        const duration = 800;
        const frame = 16;
        const steps = Math.round(duration / frame);
        const inc = (to - from) / steps;
        let currentStep = 0;
        const interval = setInterval(() => {
            currentStep++;
            start += inc;
            el.textContent = formatNumber(Math.floor(start));
            if (currentStep >= steps) {
                el.textContent = formatNumber(to);
                clearInterval(interval);
                el.style.transform = 'scale(1.08)';
                setTimeout(() => el.style.transform = '', 180);
            }
        }, frame);
    }

    // Fallback: local count (session) if CountAPI fails
    function fallbackCount(el) {
        let v = Number(localStorage.getItem('hackqori_local_count') || 0) + 1;
        localStorage.setItem('hackqori_local_count', v);
        el.textContent = formatNumber(v);
    }

    function hasCountedRecently() {
        try {
            const ts = Number(localStorage.getItem(COUNT_STORAGE_KEY) || 0);
            if (!ts) return false;
            return (Date.now() - ts) < COUNT_TTL;
        } catch (e) {
            return false;
        }
    }

    function markCountedNow() {
        try {
            localStorage.setItem(COUNT_STORAGE_KEY, String(Date.now()));
        } catch (e) {
            // ignore
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        let widget;
        try {
            widget = createWidget();
            const countEl = widget.querySelector('.vc-count');
            // show loading state
            countEl.textContent = '...';

            if (!hasCountedRecently()) {
                // increment and display
                const data = await incrementCounter();
                const value = Number(data && data.value ? data.value : 0);
                markCountedNow();
                animateCount(countEl, Math.max(0, value - 5), value);
            } else {
                // just get current value without incrementing
                const data = await getCounter();
                const value = Number(data && data.value ? data.value : 0);
                animateCount(countEl, Math.max(0, value - 5), value);
            }
        } catch (err) {
            console.warn('Visitor counter failed:', err);
            if (!widget) widget = createWidget();
            const countEl = widget.querySelector('.vc-count');
            fallbackCount(countEl);
        }
    });
})();
