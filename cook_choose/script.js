//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id === null) {
    const redirectUrl = `https://iron-66.github.io/Console56/`;
    window.location.href = redirectUrl;
}

// Функция для получения данных заказов от сервера
async function getCookToChooseOrders() {
    try {
        const response = await fetch('http://localhost:3000/check-cook-choose');
        if (!response.ok) {
            throw new Error('Request failed');
        }
        const orders = await response.json();
        console.log(orders);
                
        const list = document.getElementById('choose-orders-list');
        for (const order of orders) {
            const userResponse = await getUserData(order.userid);
            const orderResponse = await getOrderData(order.orderid);
            console.log(orderResponse); 
            console.log(typeof(orderResponse)); 

            const newLiHTML = `
            <li class="actual-orders-item">
                <div class="about-order">
                    <div class="order-item-number">
                        <p><b>Заказ от:</b></p>
                        <p class="order-number">${formatDateTime(order.createdate)}</p>
                    </div>
                </div>
                <div class="order-content">
                    <table class="order-table" cellpadding="8px">
                        <thead class="order-table-head">
                            <tr>
                                <th class="order-content-header-cntnt">Содержимое заказа:</th>
                                <th class="order-content-header-amount">Кол-во:</th>
                            </tr>
                        </thead>
                        <tbody id="order-table-${order.orderid}" class="order-table-body">
                        </tbody>
                    </table>
                </div>
                <div class="buttons">
                    <button class="apply-btn" data-orderid="${order.orderid}"></button>
                </div>
            </li>`;
            list.insertAdjacentHTML("afterbegin", newLiHTML);

            const applyBtn = document.querySelector(`[data-orderid="${order.orderid}"]`);
            applyBtn.addEventListener("click", () => {
                selectCookOrder(order.orderid);
            });

            const tableId = `order-table-${order.orderid}`;
            const tableBody = document.getElementById(tableId);

            if (tableBody) {
                tableBody.innerHTML = '';
                let productsArray = String(orderResponse.products);
                let amountsArray = String(orderResponse.amounts);
                let products = productsArray.split(';');
                let amounts = amountsArray.split(';');

                for (let i = 0; i < products.length; i++) {
                    const newTableRow = `
                        <tr>
                        <td class="order-content-header-cntnt">${products[i]}</td>
                        <td class="order-content-header-amount">${amounts[i]}</td>
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
getCookToChooseOrders();

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

// Получение данных о пользователе
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

// Выбор заказа
function selectCookOrder(orderid) {
    const selectOrderPromise = fetch('http://localhost:3000/select-order-cook', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: orderid }),
    });

    const linkEmployeePromise = fetch('http://localhost:3000/link-employee', {
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

    // Переход в активные заказы
    const activeOrd = document.getElementById('accepted-orders-button');
    activeOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_active/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в архив заказов
    const archiveOrd = document.getElementById('archive-orders-button');
    archiveOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_archive/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в личный кабинет
    const lk = document.getElementById('lk');
    lk.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_my/?id=${id}`;
        window.location.href = redirectUrl;
    });
});