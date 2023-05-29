//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Функция для получения данных заказов от сервера
async function getManagerOrders() {
    try {
        const response = await fetch('http://localhost:3000/check-manager-actual');
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const orders = await response.json();
        console.log(orders)
        
        const list = document.getElementById('act-orders-list');
        for (const order of orders) {
            console.log(order.userid);
            const data = getUserData(order.userid);

            const newLiHTML = `
            <li class="actual-orders-item">
                    <div class="about-order">
                        <div class="order-item-number">
                            <p><b>Заказ от:</b></p>
                            <p id="createdate" class="order-number">${formatDateTime(order.createdate)}</p>
                        </div>
                        <div class="order-item-status">
                            <p><b>Статус заказа:</b></p>
                            <p id="orderstatus" class="">Новый</p>
                        </div>
                    </div>
                    <div class="about-customer">
                        <div class="order-item-customer">
                            <p>Заказчик:</p>
                            <p id="name" class="order-customer">Михаил Федянин</p>
                        </div>
                        <div class="order-item-address">
                            <p>Адрес:</p>
                            <p id="address" class="order-address">${order.address}</p>
                        </div>
                        <div class="order-item-phone-number">
                            <p>Телефон:</p>
                            <p id="phone" class="order-phone-number">+79623155115</p>
                        </div>
                    </div>
                    <div class="buttons">
                        <button class="more-info-btn"></button>
                        <button class="cancel-btn"></button>
                        <button class="edit-btn"></button>
                    </div>
                    <div class="order-content">
                        <table class="order-table" cellpadding="8px">
                            <thead class="order-table-head">
                                <tr>
                                    <th class="order-content-header-cntnt">Содержимое заказа:</th>
                                    <th class="order-content-header-amount">Кол-во:</th>
                                    <th class="order-content-header-cost">Стоимость:</th>
                                </tr>
                            </thead>
                            <tbody id="order-table-body" class="order-table-body">
                            <tr>
                                <th class="order-content-header-cntnt">Пицца "Ветчина и грибы"</th>
                                <th class="order-content-header-amount">2</th>
                                <th class="order-content-header-cost">1230</th>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </li>`;
            list.insertAdjacentHTML("beforeend", newLiHTML);
        };
    } catch (error) {
        console.error('Error:', error);
    }
}

// Вызов функции для получения данных заказов
getManagerOrders();

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

function getUserData(userid) {
    fetch('http://localhost:3000/get-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: userid,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
      console.log(error);
      //alert('Произошла ошибка при отправке данных');
    });
}

const originalDateTime = "2023-05-23T19:00:00.000Z";
const formattedDateTime = formatDateTime(originalDateTime);
console.log(formattedDateTime);
  
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