const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/test-register', (req, res) => {
  console.log('Test route hit:', req.body);
  res.json({ message: 'Success!', data: req.body });
});

app.listen(5001, () => {
  console.log('Test server on port 5001');
});