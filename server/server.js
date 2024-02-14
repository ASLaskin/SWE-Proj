require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const axios = require('axios');

const MONGODB_PASS = process.env.MongoDBPass;

if (!MONGODB_PASS) {
  console.error('MongoDB password is not provided in the environment variable.');
  process.exit(1); // Exit the process if the password is not provided
}

const app = express();
app.use(express.json());
app.use(cors());

// app.get('/recipies/:query', async (req,res) => {
//   // const response = await axios.get(
//   //   `https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${wants}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&random=true`
//   // )
//   // console.log(response.data.hits.label)
//   // res.json(response.data)
// })

const mongoURI = `mongodb+srv://SWEPassword1:${encodeURIComponent(MONGODB_PASS)}@cluster0.azznp8r.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(mongoURI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
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
    console.log(user);
    if (!user) {
      return res.status(400).send('Cannot find user');
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordValid) {
      res.send('Success');
    } else {
      res.send('Not Allowed');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/swiping', async (req, res) => {
  try {
    console.log("fetching data");
    const response = await axios.get(`https://api.edamam.com/api/recipes/v2?type=any&beta=false&q=${req.body.food}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&random=true`)
    console.log(response.data.hits[0].recipe.label);
    console.log("data fetched");
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));
