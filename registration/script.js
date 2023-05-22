document.addEventListener('DOMContentLoaded', () => {
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
        // Отправка данных на локальный компьютер
        sendLoginAndPassword(login, password);
      }
    });
  });
  
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