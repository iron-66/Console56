//Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

if (id === null) {
    const redirectUrl = `https://iron-66.github.io/Console56/`;
    window.location.href = redirectUrl;
}

// Функция для получения квитанций от сервера
async function getReceipts() {
    try {
      const response = await fetch(`http://localhost:3000/check-employee-receipts?employeeid=${id}`);
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const receipts = await response.json();
      const fullname = receipts.fullname;
      const monthlyShifts = receipts.monthlyShifts;
      console.log(fullname, monthlyShifts);
  
      const list = document.getElementById('receipts');
      for (const [monthYear, shifts] of Object.entries(monthlyShifts)) {
  
        const newLiHTML = `
        <li class="receipts-item">
            <div class="about-receipt">
                <div class="receipts-item-date-and-time">
                    <p><b>Квитанция за:</b></p>
                    <p id="date" class="receipts-date-and-time">${monthYear}</p>
                </div>
                <div class="receipts-item-employee">
                    <p>Сотрудник:</p>
                    <p id="employee" class="employee">${fullname}</p>
                </div>
                <div class="receipts-item-sum">
                    <p>Количество смен:</p>
                    <p id="shifts" class="shifts">${shifts}</p>
                </div>
                <div class="receipts-item-taxes">
                    <p>Размер ставки:</p>
                    <p id="bid" class="bid">2000 руб.</p>
                </div>
                <div class="receipts-item-fees">
                    <p>Без учёта налогового вычета:</p>
                    <p id="taxless" class="taxless">${shifts * 2000} руб.</p>
                </div>
                <div class="receipts-item-total">
                    <p><b>Итого:</b></p>
                    <p id="total" class="total">${shifts * 2000 * 0.87} руб.</p>
                </div>
            </div>
        </li>`;
        list.insertAdjacentHTML("afterbegin", newLiHTML);
      };
    } catch (error) {
      console.error('Error:', error);
    }
} 

// Вызов функции для получения квитанций
getReceipts();

window.addEventListener("DOMContentLoaded", (event) => {
    // Открытие попапа смены пароля
    const addBtn = document.getElementById('change-password-btn');
    addBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = false;
    });

    // Выход из попапа смены пароля
    const backBtn = document.getElementById('back_btn');
    backBtn.addEventListener('click', () => {
        document.getElementById('popup').hidden = true;
    });

    // Смена пароля
    const oldPassInput = document.getElementById('old-pass');
    const newPassInput = document.getElementById('new-pass');
    const confirmPassInput = document.getElementById('new-pass-confirm');
    const changePassButton = document.getElementById('change-pass-button');

    changePassButton.addEventListener('click', () => {
    const oldPass = oldPassInput.value;
    const newPass = newPassInput.value;
    const confirmPass = confirmPassInput.value;

    if (newPass !== confirmPass) {
        alert('Новые пароли не совпадают');
        return;
    }

    fetch('http://localhost:3000/change-password', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            oldPass: oldPass,
            newPass: newPass,
        }),
    })
        .then(response => response.json())
        .then(data => {
        if (data.success) {
            alert('Пароль успешно изменен');
        } else {
            alert('Не удалось изменить пароль');
        }
        })
        .catch(error => {
        console.error('Ошибка при выполнении запроса:', error);
        });
    });

    // Переход в выбор заказов
    const chooseOrd = document.getElementById('actual-orders-button');
    chooseOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_choose/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в архив заказов
    const archiveOrd = document.getElementById('archive-orders-button');
    archiveOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_archive/?id=${id}`;
        window.location.href = redirectUrl;
    });

    // Переход в активные заказы
    const activeOrd = document.getElementById('accepted-orders-button');
    activeOrd.addEventListener('click', () => {
        const redirectUrl = `https://iron-66.github.io/Console56/cook_active/?id=${id}`;
        window.location.href = redirectUrl;
    });
});