function toggleLanguage() {
    const body = document.body;
    if (body.classList.contains('lang-en')) {
        body.classList.remove('lang-en');
        body.classList.add('lang-pl');
    } else {
        body.classList.remove('lang-pl');
        body.classList.add('lang-en');
    }
}

// Form handling logic
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            // 1. Visual Glue: Loading State
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processing...';

            // 2. Data Collection
            const jsonData = {};
            new FormData(this).forEach((value, key) => jsonData[key] = value);

            // 3. Sending directly to Google Script
            const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw45MIw3Cs9DxUjdtSPp9VX_Ob48v3rfO1t15hLXBDYkgiiyV4qjUIjbXAySRB5dsoOYg/exec';

            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Essential for Google Apps Script to accept the request
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData)
            })
                .then(() => {
                    // Success!
                    alert('Thank you! We have received your request.');
                    this.reset();
                })
                .catch(err => {
                    console.error('Error:', err);
                    alert('Something went wrong. Please email us directly at hello@realtalk.dev');
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                });
        });
    }
});
