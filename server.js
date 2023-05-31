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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Добавление пользователя в базу данных
app.post('/add-user', (req, res) => {
  const employeeid = generateGUID();
  const telephone = req.body.telephone;
  const fullName = req.body.fullName;
  const birthDate = req.body.birthDate;
  const address = 'Web console';
  const email = req.body.email;
  const password = req.body.password;
  const position = req.body.position;
  const employeeStatus = 'work';
  const firstWorkDate = req.body.workDate
  const lastWorkDate = req.body.workDate

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
  const login = req.body.login;
  const password = req.body.password;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }
  
    const query = 'SELECT * FROM Employees WHERE (telephone = $1 OR email = $1) AND password = $2';
    const values = [login, password];
  
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

// Смена пароля
app.post('/change-password', (req, res) => {
  const id = req.body.id;
  const oldPass = req.body.oldPass;
  const newPass = req.body.newPass;

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

// Добавление заказа
app.post('/new-order', (req, res) => {
  //users
  const userid = generateGUID();
  const name = req.body.name;
  const address = req.body.address;
  const phone = req.body.phone;
  const birth = req.body.date;
  const email = req.body.phone;
  const gamepoints = 0;

  //employee-order
  const id = generateGUID();
  const employeeid = req.body.empId;
  const orderid = generateGUID();

  //order
  const items = req.body.items;
  let products = '';
  let amounts = '';
  let currentPrice = '';
  let total = 0;
 
  items.forEach((item) => {
    products += item.name + ';';
    amounts += item.amount + ';';
    total += item.price;
    currentPrice += String(item.price) + ';';
  });

  products = products.slice(0, -1);
  amounts = amounts.slice(0, -1);
  currentPrice = currentPrice.slice(0, -1);

  const cost = `$${total.toString()}.00`;
  const extradition = 'delivery';
  let orderstatus = 'new';
  const promocode = null;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }
  
    const query = `
      WITH inserted_user AS (
        INSERT INTO users (userid, name, address, phone, birth, email, gamepoints)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      ), inserted_items AS (
        INSERT INTO orders (orderID, cost, extradition, address, createdate, preparationdate, completingdate, orderstatus, promocode, userid)
        VALUES ($10, $11, $12, $3, $5, $5, $5, $13, $14, $1)
        RETURNING *
      ), inserted_employee_order AS (
        INSERT INTO employees_orders (id, employeeid, orderid)
        VALUES ($8, $9, $10)
        RETURNING *
      ), inserted_amounts AS (
        INSERT INTO product_counts (orderID, products, amounts, prices)
        VALUES ($10, $15, $16, $17)
        RETURNING *
      )
      SELECT * FROM inserted_user, inserted_items, inserted_employee_order, inserted_amounts;
    `;
    const values = [userid, name, address, phone, birth, email, gamepoints, id, employeeid, orderid, cost, extradition, orderstatus, promocode, products, amounts, currentPrice];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      const [insertedUser, inserted_items, insertedEmployeeOrder, inserted_amounts] = result.rows;

      res.json({
        success: true,
        insertedUser,
        inserted_items,
        insertedEmployeeOrder,
        inserted_amounts
      });
    });
  });
});

// Проверка актуальных заказов менеджера
app.get('/check-manager-actual', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('new', 'accepted', 'in_work', 'in_delivery', 'paid')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Проверка заказов, доступных повару на выбор
app.get('/check-cook-choose', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('new', 'paid')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Проверка актуальных заказов повара
app.get('/check-cook-current', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('accepted')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Проверка заказов, доступных курьеру на выбор
app.get('/check-courier-choose', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('in_work')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Проверка актуальных заказов курьера
app.get('/check-courier-current', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('in_delivery')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Проверка актуальных заказов курьера
app.get('/check-archive', async (req, res) => {
  try {
    const client = await pool.connect();
    const query = `SELECT orderid, cost, address, createdate, orderid, userid, orderstatus
                   FROM orders
                   WHERE orderstatus IN ('done')`;
    const result = await client.query(query);
    client.release();
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Получение данных о заказчике по UserID
app.post('/get-user-data', (req, res) => {
  const userid = `${req.body.id}`;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'SELECT name, phone FROM users WHERE userid = $1';
    const values = [userid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      if (result.rows.length === 0) {
        res.json({ error: 'User not found' });
      } else {
        res.json(result.rows[0]);
      }
    });
  });
});

// Получение данных о заказе по OrderID
app.post('/get-order-data', (req, res) => {
  const orderid = `${req.body.id}`;

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'SELECT products, amounts, prices FROM product_counts WHERE orderid = $1';
    const values = [orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      if (result.rows.length === 0) {
        res.json({ error: 'User not found' });
      } else {
        res.json(result.rows[0]);
      }
    });
  });
});

// Изменение статуса заказа на 'new'
app.post('/change-status-to-new', (req, res) => {
  const orderid = `${req.body.id}`;
  const newStatus = 'new';

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'UPDATE orders SET orderstatus = $1 WHERE orderid = $2';
    const values = [newStatus, orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      res.json({ success: true });
    });
  });
});

// Изменение статуса заказа на 'accepted'
app.post('/select-order-cook', (req, res) => {
  const orderid = `${req.body.id}`;
  const newStatus = 'accepted';

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'UPDATE orders SET orderstatus = $1 WHERE orderid = $2';
    const values = [newStatus, orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      res.json({ success: true });
    });
  });
});

// Изменение статуса заказа на 'in_work'
app.post('/change-status-to-in_work', (req, res) => {
  const orderid = `${req.body.id}`;
  const newStatus = 'in_work';

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'UPDATE orders SET orderstatus = $1 WHERE orderid = $2';
    const values = [newStatus, orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      res.json({ success: true });
    });
  });
});

// Изменение статуса заказа на 'in_delivery'
app.post('/select-order-courier', (req, res) => {
  const orderid = `${req.body.id}`;
  const newStatus = 'in_delivery';

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'UPDATE orders SET orderstatus = $1 WHERE orderid = $2';
    const values = [newStatus, orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      res.json({ success: true });
    });
  });
});

// Изменение статуса заказа на 'done'
app.post('/complete-order', (req, res) => {
  const orderid = `${req.body.id}`;
  const newStatus = 'done';

  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Ошибка при подключении к базе данных:', err);
    }

    const query = 'UPDATE orders SET orderstatus = $1 WHERE orderid = $2';
    const values = [newStatus, orderid];

    client.query(query, values, (err, result) => {
      release();
      if (err) {
        return console.error('Ошибка при выполнении запроса:', err);
      }

      res.json({ success: true });
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
