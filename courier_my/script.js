window.addEventListener("DOMContentLoaded", (event) => {
    const bttn = document.getElementById('change-password-btn');
    if (bttn) {
        bttn.addEventListener('click', () => {
            document.getElementById('popup').hidden = false
        });
    }
});