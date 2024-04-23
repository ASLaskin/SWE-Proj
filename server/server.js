require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const uuidv4 = require('uuid').v4;
const axios = require('axios');

const MONGODB_PASS = process.env.MongoDBPass;

if (!MONGODB_PASS) {
  console.error('MongoDB password is not provided in the environment variable.');
  process.exit(1);
}

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

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
  preferences: Array,
});

const User = mongoose.model('User', userSchema);

app.use(
  session({
    secret: 'your-secret', // replace with a random string for session encryption
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }), // Session store using MongoDB
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
    },
  }),
);

const sessions = {};

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
      const sessionId = uuidv4();
      req.session.userId = user._id;
      sessions[sessionId] = user;
      res.set('Set-Cookie', `sessionId=${sessionId}`);
      res.json({ success: true, userId: user._id }); 
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/users/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.clearCookie('sessionId');
      res.send('Logged out successfully');
    }
  });
});
app.get('/users/profile', async (req, res) => {
  try {
    if (req.session && req.session.userId) {
      const user = await User.findById(req.session.userId);
      if (user) {
        res.json({ name: user.name });
      } else {
        res.status(404).send('User not found');
      }
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/swiping', async (req, res) => {
  try {
    console.log(req.session.user);

    // const user = await User.findOne({ name: req.body.name });
    // console.log(req.body.name);
    const response = await axios.get(
      `https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${req.body.food}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&cuisineType=Italian&cuisineType=Chinese&random=true`,
    );
    // console.log(response.data.hits[0].recipe.label);
    // console.log("data fetched");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

//This fetches the users preferences 
app.get('/preferences/:userID', async (req, res) => {
  try {
    const userId = req.params.userID;
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.status(200).json({ preferences: user.preferences });

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
