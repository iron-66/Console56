// Получение значения параметра id из URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

fetch('http://localhost:3000/receipt-for-manger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: id
    }),
  })
// Проверить в базе, какие счета есть для текущего id

console.log(id);

window.addEventListener("DOMContentLoaded", (event) => {
    const add_btn = document.getElementById('change-password-btn');
    if (add_btn) {
        add_btn.addEventListener('click', () => {
            document.getElementById('popup').hidden = false;
        });
    }

    const back_btn = document.getElementById('back_btn');
    if (back_btn) {
        back_btn.addEventListener('click', () => {
            document.getElementById('popup').hidden = true;
        });
    }
});