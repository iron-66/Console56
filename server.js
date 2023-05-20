const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/check-login', (req, res) => {
  const login = req.body.login;
  const password = req.body.password;

  // Проверка логина и пароля на сервере

  if (login === '1' && password === '1') {
    res.json({ valid: true, id: 1, type: 'manager' });
  }
  else {
    res.json({ valid: false });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
