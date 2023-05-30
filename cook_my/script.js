//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

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

    // Переход в выбор заказов
    const chooseOrd = document.getElementById('actual-orders-button');
    chooseOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_choose/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в активные заказы
    const activeOrd = document.getElementById('accepted-orders-button');
    activeOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_active/?id=${id}`;
        window.location.href = redirectUrl;
    });
});