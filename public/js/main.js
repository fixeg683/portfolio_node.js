// Apply the cached theme on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeToggleButton.addEventListener('click', () => {
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        localStorage.setItem('theme', 'dark'); // Or just remove it
    } else {
        body.classList.add('light');
        localStorage.setItem('theme', 'light');
    }
});

// --- Contact Form Submission ---
const contactForm = document.getElementById('contact-form');
const formResponse = document.getElementById('form-response');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    formResponse.textContent = 'Sending...';
    formResponse.style.color = 'inherit';

    try {
        const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.ok) {
            formResponse.textContent = result.msg;
            formResponse.style.color = 'lightgreen';
            contactForm.reset();
        } else {
            throw new Error(result.msg);
        }
    } catch (error) {
        formResponse.textContent = error.message || 'An error occurred. Please try again.';
        formResponse.style.color = 'red';
    } finally {
        // Clear the message after a few seconds
         setTimeout(() => {
            formResponse.textContent = '';
        }, 5000);
    }
});