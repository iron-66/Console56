//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id === null) {
    const redirectUrl = `https://iron-66.github.io/Console56/`;
    window.location.href = redirectUrl;
}

window.addEventListener("DOMContentLoaded", (event) => {
    // Открытие попапа смены пароля
    const addBtn = document.getElementById('change-password-btn');
    addBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = false;
    });

    // Выход из попапа смены пароля
    const backBtn = document.getElementById('back_btn');
    backBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = true;
    });

    // Смена пароля
    const oldPassInput = document.getElementById('old-pass');
    const newPassInput = document.getElementById('new-pass');
    const confirmPassInput = document.getElementById('new-pass-confirm');
    const changePassButton = document.getElementById('change-pass-button');

    changePassButton.addEventListener('click', () => {
    const oldPass = oldPassInput.value;
    const newPass = newPassInput.value;
    const confirmPass = confirmPassInput.value;

    if (newPass !== confirmPass) {
        alert('Новые пароли не совпадают');
        return;
    }

    fetch('http://localhost:3000/change-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            oldPass: oldPass,
            newPass: newPass,
        }),
    })
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            alert('Пароль успешно изменен');
        } else {
            alert('Не удалось изменить пароль');
        }
        })
        .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
        });
    });

    // Переход в выбор заказов
    const chooseOrd = document.getElementById('actual-orders-button');
    chooseOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_choose/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в архив заказов
    const lk = document.getElementById('archive-orders-button');
    lk.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_archive/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в активные заказы
    const activeOrd = document.getElementById('accepted-orders-button');
    activeOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_active/?id=${id}`;
        window.location.href = redirectUrl;
    });
});