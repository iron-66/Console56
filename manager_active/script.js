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
        // Здесь вы можете использовать полученные данные для создания блоков на странице
        console.log(orders);
        
        const list = document.getElementById('act-orders-list');
        orders.forEach(order => {
            const newLiHTML = `
            <li class="actual-orders-item">
                    <div class="about-order">
                        <div class="order-item-number">
                            <p><b>Заказ от:</b></p>
                            <p id="createdate" class="order-number"></p>
                        </div>
                        <div class="order-item-status">
                            <p><b>Статус заказа:</b></p>
                            <p id="orderstatus" class="">Новый</p>
                        </div>
                    </div>
                    <div class="about-customer">
                        <div class="order-item-customer">
                            <p>Заказчик:</p>
                            <p id="name" class="order-customer"></p>
                        </div>
                        <div class="order-item-address">
                            <p>Адрес:</p>
                            <p id="address" class="order-address"></p>
                        </div>
                        <div class="order-item-phone-number">
                            <p>Телефон:</p>
                            <p id="phone" class="order-phone-number"></p>
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
                            <p lass="order-content-header-cost">Стоимость:</p>
                        </div>
                        <ul class="order-content-list">
                            <li class="order-content-list-item">
                                <p id="products" class="order-content-item-name""</p>
                                <p id="amounts" class="order-content-item-amount">2</p>
                                <p id="cost" class="order-content-item-cost"></p>
                            </li>
                        </ul>
                    </div>
                </li>`;
            list.insertAdjacentHTML("beforeend", newLiHTML);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

// Вызов функции для получения данных заказов
getManagerOrders();
  
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