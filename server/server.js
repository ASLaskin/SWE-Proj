require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');

const MONGODB_PASS = process.env.MongoDBPass;
const sessionSecret = process.env.SESSION_SECRET;

if (!MONGODB_PASS) {
  console.error('MongoDB password is not provided in the environment variable.');
  process.exit(1); // Exit the process if the password is not provided
}

const app = express();
app.use(express.json());
app.use(cors());

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
  }),
);

const mongoURI = `mongodb+srv://SWEPassword1:${encodeURIComponent(
  MONGODB_PASS,
)}@cluster0.azznp8r.mongodb.net/?retryWrites=true&w=majority`;

mongoose
  .connect(mongoURI, {})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const db = mongoose.connection;

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send();
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      req.session.user = { name: user.name };
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/protected-route', (req, res) => {
  if (req.session.user) {
    res.send('You are authenticated');
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/users/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Logged out successfully');
    }
  });
});

app.get('/users/profile', (req, res) => {
  if (req.session.user) {
    const username = req.session.user.name;
    res.status(200).json({ data: username }); 
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
