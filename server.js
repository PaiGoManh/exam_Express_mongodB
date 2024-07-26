const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./Routes/userRoutes');
const applicationRoutes = require('./Routes/applicationRoutes');
const path = require('path')

const app = express();
const PORT = 3001;

mongoose.connect('mongodb://localhost:27017/recruitment');

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'Public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'register.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'login.html'));
});

app.get('/apply', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'Apply.html'));
});

app.get('/hr', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'hr.html'));
});

app.get('/updateapplication/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'update.html'));
});



app.use('/user', userRoutes);
app.use('/api', applicationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
