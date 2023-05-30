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
                
        const list = document.getElementById('act-orders-list');
        for (const order of orders) {
            const userResponse = await getUserData(order.userid);
            const orderResponse = await getOrderData(order.orderid);
            console.log(orderResponse); 
            console.log(typeof(orderResponse)); 

            const newLiHTML = `
            <li class="accepted-orders-item">
                <div class="about-order">
                    <div class="order-item-number">
                        <p><b>№ заказа:</b></p>
                        <p class="order-number">001</p>
                    </div>
                    <div class="order-item-date-and-time">
                        <p><b>Дата и время:</b></p>
                        <p class="order-date-and-time">20.05.2023 19:20</p>
                    </div>
                </div>
                <div class="order-content">
                    <div class="about-order-content">
                        <p class="order-content-header-cntnt">Содержимое заказа:</p>
                        <p class="order-content-header-amount">Кол-во:</p>
                    </div>
                    <ul class="order-content-list">
                        <li class="order-content-list-item">
                            <p class="order-content-item-name">Пицца "Четыре сыра"</p>
                            <p class="order-content-item-amount">10 шт.</p>
                        </li>
                    </ul>
                </div>
                <div class="buttons">
                    <button class="delivered-btn"></button>
                    <button class="cancel-btn"></button>
                    <button class="more-info-btn"></button>
                </div>
            </li>`;
            list.insertAdjacentHTML("beforeend", newLiHTML);

            const tableId = `order-table-${order.orderid}`;
            const tableBody = document.getElementById(tableId);

            if (tableBody) {
                tableBody.innerHTML = ''; // Очищаем содержимое tbody перед вставкой новых данных
                
                for (let i = 0; i < orderResponse.length; i++) {
                    const { products, amounts } = orderResponse[i];

                    const newTableRow = `
                        <tr>
                        <td class="order-content-header-cntnt">${products}</td>
                        <td class="order-content-header-amount">${amounts}</td>
                        <td class="order-content-header-cost">${order.cost}</td>
                        </tr>
                    `;
            
                    tableBody.insertAdjacentHTML('beforeend', newTableRow);
                }
            }
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
    return fetch('http://localhost:3000/get-user-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userid}),
    })
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка при отправке данных');
    });
}

function getOrderData(orderid) {
    return fetch('http://localhost:3000/get-order-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderid}),
    })
    .then((response) => response.json())
    .then((data) => {
        return data;
    })
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка при отправке данных');
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