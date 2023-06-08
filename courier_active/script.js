// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id === null) {
    const redirectUrl = `https://iron-66.github.io/Console56/`;
        window.location.href = redirectUrl;
}

// Функция для получения данных заказов от сервера
async function getCourierActiveOrders() {
    try {
        const response = await fetch(`http://localhost:3000/check-courier-current?employeeid=${id}`);
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const orders = await response.json();
                
        const list = document.getElementById('choose-orders-list');
        for (const order of orders) {
            const userResponse = await getUserData(order.userid);
            const orderResponse = await getOrderData(order.orderid);

            const newLiHTML = `
            <li class="accepted-orders-item">
                <div class="about-order">
                    <div class="order-item-number">
                        <p><b>Заказ от:</b></p>
                        <p class="order-number">${formatDateTime(order.createdate)}</p>
                    </div>
                </div>
                <div class="about-customer">
                    <div class="order-item-customer">
                        <p>Заказчик:</p>
                        <p class="order-customer">${userResponse.name}</p>
                    </div>
                    <div class="order-item-address">
                        <p>Адрес:</p>
                        <p class="order-address">${order.address}</p>
                    </div>
                    <div class="order-item-phone-number">
                        <p>Телефон:</p>
                        <p class="order-phone-number">${userResponse.phone}</p>
                    </div>
                </div>
                <div class="buttons">
                    <button class="delivered-btn" data-orderid="${order.orderid}"></button>
                    <button class="cancel-btn" cancel-orderid="${order.orderid}"></button>
                    <button class="more-info-btn"></button>
                </div>
                <div class="order-content">
                    <table class="order-table" cellpadding="8px">
                        <thead class="order-table-head">
                            <tr>
                                <th class="order-content-header-cntnt">Содержимое заказа:</th>
                                <th class="order-content-header-amount">Кол-во:</th>
                                <th class="order-content-header-cost">Cтоимость:</th>
                            </tr>
                        </thead>
                        <tbody id="order-table-${order.orderid}" class="order-table-body">
                        </tbody>
                    </table>
                </div>
            </li>`;
            list.insertAdjacentHTML("afterbegin", newLiHTML);

            const selectBtn = document.querySelector(`[data-orderid="${order.orderid}"]`);
            selectBtn.addEventListener("click", () => {
                completeCourierOrder(order.orderid);
            });

            const cancelBtn = document.querySelector(`[cancel-orderid="${order.orderid}"]`);
            cancelBtn.addEventListener("click", () => {
                cancelCourierOrder(order.orderid);
            });

            const tableId = `order-table-${order.orderid}`;
            const tableBody = document.getElementById(tableId);

            if (tableBody) {
                tableBody.innerHTML = '';
                let productsArray = String(orderResponse.products);
                let amountsArray = String(orderResponse.amounts);
                let priceArray = String(orderResponse.prices);
                let products = productsArray.split(';');
                let amounts = amountsArray.split(';');
                let prices = priceArray.split(';');

                for (let i = 0; i < products.length; i++) {
                    const newTableRow = `
                        <tr>
                        <td class="order-content-header-cntnt">${products[i]}</td>
                        <td class="order-content-header-amount">${amounts[i]}</td>
                        <td class="order-content-header-cost">${prices[i]}</td>
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

// Получение списка активных заказов
getCourierActiveOrders();

// Корректное отображение даты и времени
function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Получение данных о заказчике
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
      //alert('Произошла ошибка при отправке данных');
    });
}

// Получение данных о заказе
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
      //alert('Произошла ошибка при отправке данных');
    });
}

// Успешное выполнение заказа
function completeCourierOrder(orderid) {
    return fetch('http://localhost:3000/complete-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: orderid}),
    })
    .then(location.reload())
    .catch((error) => {
      console.log(error);
      //alert('Произошла ошибка при отправке данных');
    });
}

// Отмена заказа
function cancelCourierOrder(orderid) {
    const selectOrderPromise = fetch('http://localhost:3000/change-status-to-in_work', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderid }),
    });

    const linkEmployeePromise = fetch('http://localhost:3000/unlink-employee', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            orderid: orderid,
            employeeid: id
        }),
    });

    return Promise.all([selectOrderPromise, linkEmployeePromise])
    .then(() => location.reload())
    .catch((error) => {
        console.log(error);
        //alert('Произошла ошибка при отправке данных');
    });
}

window.addEventListener("DOMContentLoaded", (event) => {
    // Переход в выбор заказов
    const chooseOrd = document.getElementById('actual-orders-button');
    chooseOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/courier_choose/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в архив заказов
    const archiveOrd = document.getElementById('orders-archive-button');
    archiveOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/courier_archive/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в личный кабинет
    const lk = document.getElementById('lk');
    lk.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/courier_my/?id=${id}`;
        window.location.href = redirectUrl;
    });
});