<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

window.addEventListener("DOMContentLoaded", (event) => {
    const bttn = document.getElementById('enter-button');
    if (bttn) {
        bttn.addEventListener('click', () => {
            console.log('Button pressed')
        });
    }
});

const data = {
  // Данные для отправки на сервер
};

$.ajax({
  type: 'POST',
  url: 'https://localhost:3000/send-data', // Адрес сервера
  data: JSON.stringify({ data }), // Преобразуем данные в JSON и отправляем на сервер
  contentType: 'application/json',
  success: (response) => {
    console.log(response); // Получаем ответ от сервера
  },
  error: (error) => {
    console.log(error);
  }
});
