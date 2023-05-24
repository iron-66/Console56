//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// //Загрузка заказов
// function createOrderBlock(order) {
//     const {
//       orderid,
//       createdate,
//       orderstatus,
//       name,
//       address,
//       phone,
//       products,
//       amount,
//       cost
//     } = order;
  
//     const orderItemStatus = document.getElementById('act-orders-list') // Главный класс

//     const orderBlock = document.createElement('li');
//     orderBlock.classList.add('actual-orders-item');
//     orderBlock.id = orderid;
  
//     const aboutOrder = document.createElement('div');
//     aboutOrder.classList.add('about-order');
  
//     const orderItemNumber = document.createElement('div');
//     orderItemNumber.classList.add('order-item-number');
//     const orderItemNumberTitle = document.createElement('p');
//     orderItemNumberTitle.innerHTML = '<b>Заказ от:</b>';
//     const orderItemNumberValue = document.createElement('p');
//     orderItemNumberValue.id = 'createdate';
//     orderItemNumberValue.classList.add('order-number');
//     orderItemNumberValue.textContent = createdate;
//     orderItemNumber.appendChild(orderItemNumberTitle);
//     orderItemNumber.appendChild(orderItemNumberValue);
  
    
//     const orderItemStatusTitle = document.createElement('p');
//     orderItemStatusTitle.innerHTML = '<b>Статус заказа:</b>';
//     const orderItemStatusValue = document.createElement('p');
//     orderItemStatusValue.id = 'orderstatus';
//     orderItemStatusValue.classList.add('order-status');
//     orderItemStatusValue.textContent = orderstatus;
//     orderItemStatus.appendChild(orderItemStatusTitle);
// }



// function fetchOrders() {
//     fetch('http://localhost:3000/check-manager-actual')
//     .then(response => response.json())
//     .then(data => {
//     // Обработка полученных данных
//     data.forEach(order => {
//         const orderBlock = createOrderBlock(order);
//         // Добавление блока в нужный контейнер на странице
//         const ordersList = document.getElementById('orders-list');
//         ordersList.appendChild(orderBlock);
//     });
//     })
//     .catch(error => {
//     console.error('Ошибка при получении данных:', error);
//     });
// }

// // Вызов функции для отправки запроса на сервер
// fetchOrders();
  
  

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