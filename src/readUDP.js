var dgram = require("dgram");

var server = dgram.createSocket("udp4");

var lights = "00001011"


server.on("message", function (msg, rinfo) {
  console.log("server got: " + msg[0]+ " from " +
    rinfo.address + ":" + rinfo.port);

  const buffer = Buffer.from([0x02, 0x02, 0x03, 0x04, 0x05, 0x06]);
  
  //var test = stores.io.subscribe()
  //console.log(test)
  integer = parseInt(lights,2);
  retMessage = msg
  PC_inputs = msg[0]
  retMessage[0] = integer
  server.send(retMessage,1202,"192.168.2.20")
});

server.on("listening", function () {
  var address = server.address();
  console.log("server listening " +
      address.address + ":" + address.port);
});

server.bind(1202,"192.168.2.99");
// server listening 0.0.0.0:41234