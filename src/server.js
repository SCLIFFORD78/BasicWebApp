const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const Calf = require("./models/calf");
const FeedPlan = require("./models/feedPlan")

var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var lights = "00000000"
let inFromPLC;


server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg[0] + " from " +
    rinfo.address + ":" + rinfo.port);

  const buffer = Buffer.from([0x02, 0x02, 0x03, 0x04, 0x05, 0x06]);

  //var test = stores.io.subscribe()
  //console.log(test)
  integer = parseInt(lights, 2);
  inFromPLC = msg
  retMessage = msg
  PC_inputs = msg[0]
  retMessage[0] = integer
  server.send(retMessage, 1202, "192.168.2.20")
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
    address.address + ":" + address.port);
});

server.bind(1202, "192.168.2.99");
// server listening 0.0.0.0:41234


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

app.post('/io/outputs',  (req, res, next) => {
  const io = req.body
  lights = io.outputs
  integer = parseInt(lights, 2);
  retMessage = []
  retMessage[0] = integer
  //retMessage[1] = integer
  const buff = Buffer.from(retMessage)
  server.send(buff, 1202, "192.168.2.20")
  return res
});

app.get('/io/outputs', async (req, res, next) => {
  return res.json(inFromPLC)
});

app.get('/api/calves', async (req, res, next) => {
  let ret = []
  await Calf.find().then(async calves => {
    if (!calves) {
      return res.status(404).json({ error: "No Profile Found" });
    }
    else {
      for (let index = 0; index < calves.length; index++) {
        const element = calves[index];
        await Calf.findById(element._id).populate('feedPlan').then(r => {
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
  console.log(req.body)
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

// Delete a calf
app.delete('/api/calf', async (req, res, next) => {
  // find calf by id and delete
  Calf.findByIdAndDelete(req.body._id, function (err, docs) {
    if (err) {
      console.log(err)
      return res.json({
        message: 'Calf Not deleted ',
        success: false,
      });
    }
    else {
      console.log("Deleted : ", docs);
      return res.json({
        message: 'Calf deleted successfully',
        success: true,
      });
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