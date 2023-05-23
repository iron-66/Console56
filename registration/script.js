// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

document.addEventListener('DOMContentLoaded', () => {
    // Возврат в личный кабинет
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', () => {
      const redirectUrl = `https://iron-66.github.io/Console56/manager_my/?id=${id}`;
      window.location.href = redirectUrl;
    });

    // Отправка данных о новом сотруднике
    const enterButton = document.getElementById('add-button');
    enterButton.addEventListener('click', () => {
  
      const loginInput = document.getElementById('login-input');
      const passwordInput = document.getElementById('password-input');

  
      const login = loginInput.value;
      const password = passwordInput.value;
  
      if (loginInput.value === '' || passwordInput.value === '') {
        alert('Заполните все поля');
      }
      else {
        sendLoginAndPassword(login, password);
      }
    });
  });
  
  // Отправка данных на локальный компьютер
  function sendLoginAndPassword(login, password) {
    fetch('http://localhost:3000/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
        alert('Пользователь успешно зарегистрирован');
    })
    // Обработка ошибки при отправке запроса
    .catch((error) => {
      console.log(error);
      alert('Произошла ошибка при отправке данных');
    });
  }