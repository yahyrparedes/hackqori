/**
 * Contact Form Handler using Formspree
 * Manages AJAX submission, state changes, and status messages.
 */
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    if (!form) {
        return; // No hay formulario en esta página
    }

    const formStatus = document.getElementById('formStatus');
    const submitButton = form.querySelector('button[type="submit"]');
    const submitText = submitButton.querySelector('.submit-text');
    const loadingSpinner = submitButton.querySelector('.spinner-border');
    const loadingText = submitButton.querySelector('.loading-text');

    async function handleSubmit(event) {
        event.preventDefault();

        // Mostrar estado de carga
        submitText.classList.add('d-none');
        loadingSpinner.classList.remove('d-none');
        loadingText.classList.remove('d-none');
        submitButton.disabled = true;
        formStatus.innerHTML = '';

        const data = new FormData(event.target);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Éxito
                formStatus.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show" role="alert">
                        <i class="bi bi-check-circle-fill me-2"></i>
                        <strong>¡Mensaje enviado!</strong> Gracias por contactarnos, te responderemos pronto.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `;
                form.reset();
            } else {
                // Error del servidor o de la data
                const responseData = await response.json();
                if (Object.hasOwn(responseData, 'errors')) {
                    const errorMessages = responseData.errors.map(error => error.message).join(', ');
                    throw new Error(errorMessages);
                } else {
                    throw new Error('Hubo un problema al enviar el formulario.');
                }
            }
        } catch (error) {
            // Error de red o del bloque catch anterior
            formStatus.innerHTML = `
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    <strong>Error:</strong> ${error.message || 'No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.'}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
        } finally {
            // Restaurar estado del botón
            submitText.classList.remove('d-none');
            loadingSpinner.classList.add('d-none');
            loadingText.classList.add('d-none');
            submitButton.disabled = false;
        }
    }

    form.addEventListener("submit", handleSubmit);
});

