window.addEventListener("DOMContentLoaded", (event) => {
    const bttn = document.getElementById('enter-button');
    if (bttn) {
        bttn.addEventListener('click', () => {
            console.log('Button pressed')
        });
    }
});