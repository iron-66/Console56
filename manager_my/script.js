// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Проверить на сервере, какие счета есть для текущего id

console.log(id);

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
});