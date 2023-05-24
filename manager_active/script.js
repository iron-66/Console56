// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Загрузка заказов
function createOrderBlock(order) {
    const {
      orderid,
      createdate,
      orderstatus,
      name,
      address,
      phone,
      products,
      amount,
      cost
    } = order;
  
    const orderItemStatus = document.getElementById('act-orders-list') // Главный класс

    const orderBlock = document.createElement('li');
    orderBlock.classList.add('actual-orders-item');
    orderBlock.id = orderid;
  
    const aboutOrder = document.createElement('div');
    aboutOrder.classList.add('about-order');
  
    const orderItemNumber = document.createElement('div');
    orderItemNumber.classList.add('order-item-number');
    const orderItemNumberTitle = document.createElement('p');
    orderItemNumberTitle.innerHTML = '<b>Заказ от:</b>';
    const orderItemNumberValue = document.createElement('p');
    orderItemNumberValue.id = 'createdate';
    orderItemNumberValue.classList.add('order-number');
    orderItemNumberValue.textContent = createdate;
    orderItemNumber.appendChild(orderItemNumberTitle);
    orderItemNumber.appendChild(orderItemNumberValue);
  
    
    const orderItemStatusTitle = document.createElement('p');
    orderItemStatusTitle.innerHTML = '<b>Статус заказа:</b>';
    const orderItemStatusValue = document.createElement('p');
    orderItemStatusValue.id = 'orderstatus';
    orderItemStatusValue.classList.add('order-status');
    orderItemStatusValue.textContent = orderstatus;
    orderItemStatus.appendChild(orderItemStatusTitle);
}

function insertOrderBlock() {
    const ulElement = document.getElementById('act-orders-list');
  
    // Создание нового элемента списка
    const liElement = document.createElement('li');
    liElement.className = 'actual-orders-item';
  
    // Вставка содержимого блока
    liElement.innerHTML = `
      <div class="about-order">
        <div class="order-item-number">
          <p><b>Заказ от:</b></p>
          <p id="createdate" class="order-number">24.05.2023 14:15</p>
        </div>
        <div class="order-item-status">
          <p><b>Статус заказа:</b></p>
          <p id="orderstatus" class="order-status">Новый</p>
        </div>
      </div>
      <div class="about-customer">
        <div class="order-item-customer">
          <p>Заказчик:</p>
          <p id="name" class="order-customer">Носков Дмитрий Павлович</p>
        </div>
        <div class="order-item-address">
          <p>Адрес:</p>
          <p id="address" class="order-address">Армавирская 24А, кв.167</p>
        </div>
        <div class="order-item-phone-number">
          <p>Телефон:</p>
          <p id="phone" class="order-phone-number">+79527896510</p>
        </div>
      </div>
      <div class="buttons">
        <button class="more-info-btn"></button>
        <button class="cancel-btn"></button>
        <button class="edit-btn"></button>
      </div>
      <div class="order-content">
        <div class="order-content-header">
          <p class="order-content-header-cntnt">Содержимое заказа:</p>
          <p class="order-content-header-amount">Кол-во:</p>
          <p class="order-content-header-cost">Стоимость:</p>
        </div>
        <ul class="order-content-list">
          <li class="order-content-list-item">
            <p id="products" class="order-content-item-name">Пицца "Ветчина и грибы"</p>
            <p id="amounts" class="order-content-item-amount">2</p>
            <p id="cost" class="order-content-item-cost">1230</p>
          </li>
        </ul>
      </div>
    `;
  
    // Вставка элемента в список
    ulElement.appendChild(liElement);
  }
  
  // Вызов функции для вставки блока
  insertOrderBlock();
  

function fetchOrders() {
    fetch('http://localhost:3000/check-manager-actual')
    .then(response => response.json())
    .then(data => {
    // Обработка полученных данных
    data.forEach(order => {
        const orderBlock = createOrderBlock(order);
        // Добавление блока в нужный контейнер на странице
        const ordersList = document.getElementById('orders-list');
        ordersList.appendChild(orderBlock);
    });
    })
    .catch(error => {
    console.error('Ошибка при получении данных:', error);
    });
}

// Вызов функции для отправки запроса на сервер
fetchOrders();
  
  

window.addEventListener("DOMContentLoaded", (event) => {
    // Переход в окно добавления заказа
    const newOrd = document.getElementById('new-order');
    newOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/manager_new/?id=${id}`;
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
});