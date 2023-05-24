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

    // Добавление блюд в список заказа
    let selectedDish = ''
    const dishes = document.querySelectorAll('dish');
    dishes.forEach((dish) => {
        dish.addEventListener('click', () => {
            dishes.forEach((item) => {
                item.style.backgroundColor = '';
            });
            dish.style.backgroundColor = '#bbb9ba';
            selectedDish = dishes.textContent;
        }) 
    });

    const addToOrderBtn = document.getElementById('add-products');
    addToOrderBtn.addEventListener('click', () => {
        const orderList = document.getElementById('order-list');
        const dishQuantityInput = document.getElementById('dish-quanity');
        const dishQuantity = dishQuantityInput.value;

        const listItem = document.createElement('li');
        listItem.classList.add('order-content-list-item');
        listItem.innerHTML = `
            <p class="order-content-item-name">${selectedDish}</p>
            <p class="order-content-item-amount">${dishQuantity} шт.</p>
        `;

        orderList.appendChild(listItem);
        document.getElementById('popup').hidden = true;
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
            const selectedDishes = document.querySelectorAll('.order-content-item-name');
            const selectedDishAmounts = document.querySelectorAll('.order-content-item-amount');
            const orderItems = [];
            selectedDishes.forEach((dish, index) => {
                const dishName = dish.textContent;
                const dishAmount = selectedDishAmounts[index].textContent.replace(' шт.', '');
                orderItems.push({ name: dishName, amount: dishAmount });
            });

            setNewOrder(name, address, phone, today, orderItems);
        }
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
        items: orderItems,
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