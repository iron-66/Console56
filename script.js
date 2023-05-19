<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
window.addEventListener("DOMContentLoaded", (event) => {
    const bttn = document.getElementById('enter-button');
    if (bttn) {
        bttn.addEventListener('click', () => {
            console.log('Button pressed')
        });
    }
});
