// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id === null) {
    const redirectUrl = `https://iron-66.github.io/Console56/`;
    window.location.href = redirectUrl;
}

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
    let selectedDish = null;
    const dishes = document.querySelectorAll('.dish');

    dishes.forEach((dish) => {
        dish.addEventListener('click', () => {
            if (selectedDish !== null) {
                selectedDish.style.backgroundColor = '';
            }

            selectedDish = dish;
            selectedDish.style.backgroundColor = '#bbb9ba';
        });
    });

    let orderItems = [];
    const addToOrderBtn = document.getElementById('add-products');
    addToOrderBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = true;
        const dishQuantityInput = document.getElementById('dish-quanity');
        const dishQuantity = dishQuantityInput.value;
        const tableBody = document.getElementById("order-table-body");
        const row = document.createElement("tr");
        const dishNameCell = document.createElement("td");
        dishNameCell.textContent = selectedDish.textContent;
        const quantityCell = document.createElement("td");
        quantityCell.textContent = dishQuantity;
        const totalCostCell = document.createElement("td");
        totalCostCell.textContent = selectedDish.value * dishQuantity;
        console.log(dishNameCell, quantityCell, totalCostCell);
        orderItems.push({ name: dishNameCell.textContent, amount: quantityCell.textContent, price: parseInt(totalCostCell.textContent) })

        row.appendChild(dishNameCell);
        row.appendChild(quantityCell);
        row.appendChild(totalCostCell);

        tableBody.appendChild(row);
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

        if (nameInput.value === '' || addressInput.value === '' || addressInput.value === '' || selectedDish === null) {
            alert('Заполните все поля');
        }
        else {
            setNewOrder(name, address, phone, today, orderItems);
        }
    });
});

// Корректное форматирование даты и времени
function formatToday(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:000000`;
}

// Отправка данных о новом заказе
function setNewOrder(name, address, phone, today, orderItems) {
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