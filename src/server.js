const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const Candidate = require("./models/candidate");


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Initiate MongoDB and start server
app.listen(PORT, () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/donation', { useNewUrlParser: true }).then((response) => {
    console.log(`Connected to MongoDB and server started on PORT ${PORT}`);
  }).catch((err) => {
    console.log(err);
  })
});

const db = mongoose.connection;



app.get('/api/candidates', async (req, res, next) => {
  await Candidate.find().then(candidates => {
    if (!candidates) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      return res.json(candidates);
    }
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
    ;
  });
});

app.post('/api/candidates', async (req, res, next) => {
  const candidate = new Candidate(req.body)
  console.log(req)
  await candidate.save();
  return  res.json(candidate)
});