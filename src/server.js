const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const Calf = require("./models/calf");
const FeedPlan = require("./models/feedPlan")


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Initiate MongoDB and start server
app.listen(PORT, () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/feeder', { useNewUrlParser: true }).then((response) => {
    console.log(`Connected to MongoDB and server started on PORT ${PORT}`);
  }).catch((err) => {
    console.log(err);
  })
});

const db = mongoose.connection;



app.get('/api/calves', async (req, res, next) => {
  let ret = []
  await Calf.find().then(async calves => {
    if (!calves) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      for (let index = 0; index < calves.length; index++) {
        const element = calves[index];
        await Calf.findById(element._id).populate('feedPlan').then(r =>{
          //console.log(r)
          ret.push(r)
        })
      }
      return res.json(ret);
    }
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
    ;
  });
});

app.post('/api/calves', async (req, res, next) => {
  const calf = new Calf(req.body)
  await calf.save();
  return res.json(calf)
});

app.get('/api/calf/:id', async (req, res, next) => {
  await Calf.findById(req.params.id).populate('feedPlan').then(calf => {
    if (!calf) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      res.json(calf)
      return res.data;
    }
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
    ;
  });
});
app.put('/api/calf/:id', async (req, res, next) => {
  Calf.findByIdAndUpdate(req.params.id, {
    tag: req.body.tag,
    feedPlan: req.body.feedPlan,
    breed: req.body.breed,
    DOB: req.body.DOB
  },
    function (err, docs) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Updated User : ", docs);
        return res
      }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/api/feedplan', async (req, res, next) => {
  await FeedPlan.find().then(feedPlans => {
    if (!feedPlans) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      return res.json(feedPlans);
    }
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
    ;
  });
});

app.get('/api/feedplan/:id', async (req, res, next) => {
  await FeedPlan.findById(req.params.id).then(feedPlan => {
    if (!feedPlan) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      res.json(feedPlan)
      return res.data;
    }
  }).catch(err => {
    console.log(err);
    return res.sendStatus(500);
    ;
  });
});

app.post('/api/feedplan', async (req, res, next) => {
  const feedplan = new FeedPlan(req.body)
  await feedplan.save();
  return res.json(feedplan)
});