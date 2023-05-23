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

  // Выбор должности сотрудника
  let job = '';
  const jobItems = document.querySelectorAll('.job-item');
  jobItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      jobItems.forEach((item) => {
        item.classList.remove('active');
      });
      event.currentTarget.classList.add('active');
      job = event.currentTarget.getAttribute('value');
    });
  });

  // Отправка данных о новом сотруднике
  const enterButton = document.getElementById('add-button');
  enterButton.addEventListener('click', () => {

    const fioInput = document.getElementById('fio-input');
    const phoneInput = document.getElementById('phone-input');
    const emailInput = document.getElementById('email-input');
    const birthDateInput = document.getElementById('birth-date-input');
    const passwordInput = document.getElementById('password-input');

    const fio = fioInput.value;
    const phone = phoneInput.value;
    const email = emailInput.value;
    const birthDate = birthDateInput.value;
    const formattedDate = formatDate(birthDate);
    const password = passwordInput.value;
    const currentDate = new Date();
    const today = formatDate(currentDate);

    if (fioInput.value === '' || phoneInput.value === '' || emailInput.value === '' || birthDateInput.value === '' || passwordInput.value === '' || job === '') {
      alert('Заполните все поля');
    }
    else {
      sendLoginAndPassword(fio, phone, email, formattedDate, password, job, today);
    }
  });
});

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `'${year}-${month}-${day}'`;
}
  
// Отправка данных на локальный компьютер
function sendLoginAndPassword(fio, phone, email, formattedDate, password, job, today) {
  fetch('http://localhost:3000/add-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName: fio,
      telephone: phone,
      email: email,
      birthDate: formattedDate,
      password: password,
      position: job,
      workDate: today,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
      alert('Пользователь успешно зарегистрирован');
  })
  .catch((error) => {
    console.log(error);
    alert('Произошла ошибка при отправке данных');
  });
}