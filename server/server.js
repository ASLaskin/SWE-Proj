const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.send('Hello World!');
  res.json({ message: user1 });
});

app.listen(5000, () => console.log('Server running on port 5000'));
