const express = require('express');
const { Pool } = require('pg');
const crypto = require('crypto');
const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  password: '@W#@aEeGzMxE8MPHPZia',
  host: '77.223.99.19',
  port: 5432,
  database: 'postgres'
});

function generateGUID() {
  const guid = crypto.randomUUID();
  return guid;
}

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Добавление пользователя в базу данных
app.post('/add-user', (req, res) => {
  const employeeid = generateGUID();
  const telephone = req.body.login;
  const fullName = 'Admin';
  const birthDate = '01-01-2000';
  const address = 'test';
  const email = '1@test.ru';
  const password = req.body.password;
  const position = 'manager';
  const employeeStatus = 'fired';
  const firstWorkDate = `'2023-05-20'`
  const lastWorkDate = `'2023-05-22'`

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }
  
    const query = 'INSERT INTO Employees (employeeid, telephone, fullName, birthDate, address, email, password, position, employeeStatus, firstWorkDate, lastWorkDate) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
    const values = [employeeid, telephone, fullName, birthDate, address, email, password, position, employeeStatus, firstWorkDate, lastWorkDate];
  
    client.query(query, values, (err) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }
  
      res.json({success: true});
    });
  });
});

// Проверка логина и пароля на сервере
app.post('/check-login', (req, res) => {
  const fullName = req.body.login;
  const password = req.body.password;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }
  
    const query = 'SELECT * FROM Employees WHERE fullName = $1 AND password = $2';
    const values = [fullName, password];
  
    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }
  
      if (result.rows.length > 0) {
        const user = result.rows[0];
        res.json({ valid: true, id: user.employeeid, type: user.position });
      } else {
        res.json({ valid: false });
      }
    });
  });
});

app.post('/change-password', (req, res) => {
  const { id, oldPass, newPass } = req.body;

  // Проверка наличия пользователя с указанным id и старым паролем в базе данных
  pool.query('SELECT * FROM employees WHERE employeeid = $1 AND password = $2', [id, oldPass], (error, result) => {
    if (error) {
      console.error('Ошибка при выполнении запроса:', error);
      res.json({ success: false });
    } else {
      const userExists = result.rowCount > 0;

      if (userExists) {
        // Обновление пароля пользователя
        pool.query('UPDATE employees SET password = $1 WHERE employeeid = $2', [newPass, id], (error, result) => {
          if (error) {
            console.error('Ошибка при выполнении запроса:', error);
            res.json({ success: false });
          } else {
            res.json({ success: true });
          }
        });
      } else {
        res.json({ success: false });
      }
    }
  });
});

app.post('/receipt-for-manger', (req, res) => {
  const salary = req.body.login;
  let orders = 180 // взять из базы

  if (login === '1' && password === '1') {
    res.json({ valid: true, id: 1,  type: 'manager' });
  }
  else if (login === '2' && password === '2') {
    res.json({ valid: true, id: 1,  type: 'cook' });
  }
  else if (login === '3' && password === '3') {
    res.json({ valid: true, id: 1,  type: 'courier' });
  }
  else {
    res.json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
