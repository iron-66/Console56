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
    const birthDate = formatDate(birthDateInput.value);
    const password = passwordInput.value;
    const today = formatToday(new Date());

    if (fioInput.value === '' || phoneInput.value === '' || emailInput.value === '' || birthDateInput.value === '' || passwordInput.value === '' || job === '') {
      alert('Заполните все поля');
    }
    else {
      sendLoginAndPassword(fio, phone, email, birthDate, password, job, today);
    }
  });
});

function formatToday(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `'${year}-${month}-${day}'`;
};

function formatDate(dateString) {
  const parts = dateString.split('.');
  const day = parts[0].padStart(2, '0');
  const month = parts[1].padStart(2, '0');
  const year = parts[2];
  console.log(`'${year}-${month}-${day}'`);
  return `'${year}-${month}-${day}'`;
};
  
// Отправка данных на локальный компьютер
function sendLoginAndPassword(fio, phone, email, birthDate, password, job, today) {
  fetch('http://localhost:3000/add-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName: fio,
      telephone: phone,
      email: email,
      birthDate: birthDate,
      password: password,
      position: job,
      workDate: today,
    }),
  })
  .then((response) => response.json())
  .then((data) => {
      alert('Пользователь успешно зарегистрирован');
      window.location.reload();
  })
  .catch((error) => {
    console.log(error);
    alert('Произошла ошибка при отправке данных');
  });
};