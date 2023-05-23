// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    // Переход в актуальные заказы
    const actualOrd = document.getElementById('actual-orders');
    actualOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/manager_active/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в архив заказов
    const archiveOrd = document.getElementById('orders-archive');
    archiveOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/manager_archive/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в личный кабинет
    const lk = document.getElementById('lk');
    lk.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/manager_my/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Формирование нового заказа
    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.addEventListener('click', () => {

        const nameInput = document.getElementById('name');
        const addressInput = document.getElementById('address');
        const phoneInput = document.getElementById('phone');

        const name = nameInput.value;
        const address = addressInput.value;
        const phone = phoneInput.value;
        const today = formatToday(new Date());

        if (nameInput.value === '' || addressInput.value === '' || addressInput.value === '') {
            alert('Заполните все поля');
        }
        else {
            setNewOrder(name, address, phone, today);
        }
    });

    // Открытие попап окна со всеми блюдами
    const viewBtn = document.getElementById('view-products');
    viewBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = false;
    });

    // Выход из попапа
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = true;
    });
});

function formatToday(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `'${year}-${month}-${day}'`;
};

// Отправка данных на локальный компьютер
function setNewOrder(name, address, phone, today) {
    fetch('http://localhost:3000/new-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone: phone,
        date: today,
        empId: id,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert('Заказ успешно размещён');
        window.location.reload();
    })
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка при отправке данных');
    });
};