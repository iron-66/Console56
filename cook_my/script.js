window.addEventListener("DOMContentLoaded", (event) => {
    const add_btn = document.getElementById('change-password-btn');
    if (add_btn) {
        add_btn.addEventListener('click', () => {
            document.getElementById('popup').hidden = false;
        });
    }

    const back_btn = document.getElementById('back_btn');
    if (back_btn) {
        back_btn.addEventListener('click', () => {
            document.getElementById('popup').hidden = true;
        });
    }

    document.getElementsByClassName('nav-btn').forEach(element => {
        element.style.background = '#FFFFFF'
    });
    const lk_btn = document.getElementsByClassName('LK-button')
    lk_btn.style.background = '#F5FFFA'
});