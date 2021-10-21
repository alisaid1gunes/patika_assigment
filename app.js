const express = require('express');

const app = express();

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

const dotenv = require('dotenv');

const cors = require('cors');


dotenv.config();

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
    console.log('db connected');
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use(cors());


