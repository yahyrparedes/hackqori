/**
 * Cookie Consent Management System
 * RGPD/GDPR Compliance for HackQori
 * @version 1.0.0
 */

const CookieConsent = {
    // Configuración
    cookieName: 'hackqori_cookie_consent',
    cookieExpiry: 365, // días

    /**
     * Inicializar el sistema de cookies
     */
    init() {
        console.log('🍪 Inicializando sistema de cookies...');
        this.checkConsent();
        this.attachEventListeners();
    },

    /**
     * Verificar si ya existe consentimiento
     */
    checkConsent() {
        const consent = this.getCookie(this.cookieName);

        if (!consent) {
            // No hay consentimiento, mostrar banner después de 1 segundo
            console.log('No hay consentimiento previo, mostrando banner...');
            setTimeout(() => {
                this.showBanner();
            }, 1000);
        } else {
            // Ya hay consentimiento, cargar cookies según preferencias
            try {
                const preferences = JSON.parse(consent);
                console.log('Consentimiento encontrado:', preferences);
                this.loadCookies(preferences);
            } catch (error) {
                console.error('Error al parsear preferencias:', error);
                // Si hay error, mostrar banner de nuevo
                this.showBanner();
            }
        }
    },

    /**
     * Mostrar banner de cookies
     */
    showBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            console.log('Mostrando banner de cookies');
            banner.classList.add('show');
        } else {
            console.error('Banner de cookies no encontrado en el DOM');
        }
    },

    /**
     * Ocultar banner de cookies
     */
    hideBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
        }
    },

    /**
     * Mostrar modal de configuración
     */
    showModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevenir scroll
            this.loadCurrentPreferences();
        }
    },

    /**
     * Ocultar modal de configuración
     */
    hideModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = ''; // Restaurar scroll
        }
    },

    /**
     * Cargar preferencias actuales en el modal
     */
    loadCurrentPreferences() {
        const consent = this.getCookie(this.cookieName);
        if (consent) {
            try {
                const preferences = JSON.parse(consent);

                const analyticsCheckbox = document.getElementById('analyticsCookies');
                const marketingCheckbox = document.getElementById('marketingCookies');

                if (analyticsCheckbox) {
                    analyticsCheckbox.checked = preferences.analytics || false;
                }
                if (marketingCheckbox) {
                    marketingCheckbox.checked = preferences.marketing || false;
                }
            } catch (error) {
                console.error('Error al cargar preferencias:', error);
            }
        }
    },

    /**
     * Aceptar todas las cookies
     */
    acceptAll() {
        console.log('Usuario aceptó todas las cookies');
        const preferences = {
            essential: true,
            analytics: true,
            marketing: true,
            timestamp: new Date().toISOString()
        };

        this.savePreferences(preferences);
        this.hideBanner();
        this.hideModal();
        this.loadCookies(preferences);

        this.showNotification('✓ Preferencias guardadas correctamente');
    },

    /**
     * Rechazar todas las cookies (excepto esenciales)
     */
    rejectAll() {
        console.log('Usuario rechazó cookies opcionales');
        const preferences = {
            essential: true,
            analytics: false,
            marketing: false,
            timestamp: new Date().toISOString()
        };

        this.savePreferences(preferences);
        this.hideBanner();
        this.hideModal();
        this.loadCookies(preferences);

        this.showNotification('✓ Preferencias guardadas correctamente');
    },

    /**
     * Guardar preferencias personalizadas
     */
    saveCustomPreferences() {
        const analyticsCheckbox = document.getElementById('analyticsCookies');
        const marketingCheckbox = document.getElementById('marketingCookies');

        const preferences = {
            essential: true,
            analytics: analyticsCheckbox ? analyticsCheckbox.checked : false,
            marketing: marketingCheckbox ? marketingCheckbox.checked : false,
            timestamp: new Date().toISOString()
        };

        console.log('Guardando preferencias personalizadas:', preferences);

        this.savePreferences(preferences);
        this.hideBanner();
        this.hideModal();
        this.loadCookies(preferences);

        this.showNotification('✓ Preferencias guardadas correctamente');
    },

    /**
     * Guardar preferencias en cookie
     */
    savePreferences(preferences) {
        const value = JSON.stringify(preferences);
        this.setCookie(this.cookieName, value, this.cookieExpiry);
        console.log('Preferencias guardadas en cookie');
    },

    /**
     * Cargar cookies según preferencias
     */
    loadCookies(preferences) {
        console.log('Cargando cookies según preferencias:', preferences);

        // Cookies esenciales siempre se cargan
        this.loadEssentialCookies();

        // Cookies analíticas
        if (preferences.analytics) {
            this.loadAnalyticsCookies();
        } else {
            console.log('Cookies analíticas desactivadas');
        }

        // Cookies de marketing
        if (preferences.marketing) {
            this.loadMarketingCookies();
        } else {
            console.log('Cookies de marketing desactivadas');
        }
    },

    /**
     * Cargar cookies esenciales
     */
    loadEssentialCookies() {
        console.log('✓ Cookies esenciales cargadas');
        // Aquí van las cookies necesarias para el funcionamiento del sitio
        // Por ejemplo: sesión, preferencias de idioma, etc.
    },

    /**
     * Cargar cookies analíticas (Google Analytics, etc.)
     */
    loadAnalyticsCookies() {
        console.log('✓ Cookies analíticas cargadas');

        // Ejemplo: Google Analytics 4
        // Descomenta y personaliza con tu ID de medición
        /*
        if (typeof gtag === 'undefined') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX', {
                'anonymize_ip': true,
                'cookie_flags': 'SameSite=None;Secure'
            });

            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
            document.head.appendChild(script);
        }
        */
    },

    /**
     * Cargar cookies de marketing
     */
    loadMarketingCookies() {
        console.log('✓ Cookies de marketing cargadas');

        // Aquí van las cookies de marketing (Facebook Pixel, etc.)
        // Ejemplo Facebook Pixel:
        /*
        if (typeof fbq === 'undefined') {
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'YOUR_PIXEL_ID');
            fbq('track', 'PageView');
        }
        */
    },

    /**
     * Adjuntar event listeners a los botones
     */
    attachEventListeners() {
        // Botón aceptar todas
        const acceptBtn = document.getElementById('acceptCookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                console.log('Click en Aceptar todas');
                this.acceptAll();
            });
        }

        // Botón configurar
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                console.log('Click en Configurar');
                this.showModal();
            });
        }

        // Botón rechazar todas
        const rejectBtn = document.getElementById('rejectAll');
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => {
                console.log('Click en Rechazar todas');
                this.rejectAll();
            });
        }

        // Botón guardar preferencias
        const saveBtn = document.getElementById('savePreferences');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                console.log('Click en Guardar preferencias');
                this.saveCustomPreferences();
            });
        }

        // Botón cerrar modal
        const closeBtn = document.getElementById('closeCookieModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                console.log('Click en Cerrar modal');
                this.hideModal();
            });
        }

        // Cerrar modal al hacer click fuera
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hideModal();
                }
            });
        }
    },

    /**
     * Establecer una cookie
     */
    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
    },

    /**
     * Obtener una cookie
     */
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    /**
     * Eliminar una cookie
     */
    deleteCookie(name) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },

    /**
     * Mostrar notificación temporal
     */
    showNotification(message) {
        // Verificar si ya existe una notificación
        const existingNotification = document.querySelector('.cookie-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = 'cookie-notification';
        notification.innerHTML = `
            <div class="cookie-notification-content">
                <i class="bi bi-check-circle-fill"></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Remover después de 3 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 500);
        }, 3000);
    }
};

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        CookieConsent.init();
    });
} else {
    // DOM ya está listo
    CookieConsent.init();
}

