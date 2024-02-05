const express = require('express');
const app = express();

app.use(express.json());

//Temporary data needs to be stored in database
const users = []

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
    const user = {name: req.body.name, password: req.body.password};
    users.push(user);
    res.status(201).send();
});

app.listen(5000, () => console.log('Server running on port 5000'));
