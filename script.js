<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const enterButton = document.getElementById("enter-button");

  enterButton.addEventListener("click", () => {
    const loginInput = document.querySelector(".login-input");
    const passwordInput = document.querySelector(".password-input");

    const login = loginInput.value;
    const password = passwordInput.value;

    // Отправка данных на локальный компьютер
    sendLoginAndPassword(login, password);
  });
});

function sendLoginAndPassword(login, password) {
  fetch("https://localhost:3000/check-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
    // Проверка ответа от локального компьютера
    if (data.valid) {
      // Перенаправление пользователя на указанную страницу
      window.location.href = "https://iron-66.github.io/Console56/manager_my/";
    } else {
      // Обработка случая некорректных данных для входа
      alert("Некорректные данные для входа");
    }
  })
  // Обработка ошибки при отправке запроса
  .catch((error) => {
    console.log(error);
    alert("Произошла ошибка при отправке данных");
  });
}
