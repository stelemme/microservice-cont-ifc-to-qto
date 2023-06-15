const path = require("path");
const axios = require('axios');

const ifcToQtoGET = (req, res) => {
  res.set({
    Server: "My Node.js Server",
    "Content-Type": "application/json",
    "Content-Length": 155,
  });

  res.status(200).json({
    supported_methods: ["GET", "POST"],
    POST_request_data: "application/json",
    POST_response_data: "application/ld+json",
  });
};

const ifcToQtoPOST = (req, res) => {
  // The data is retrieved out of the incoming HTTP POST request.
  const jsonPayload = req.body;

  axios
  .get(jsonPayload["ifc_location"], { responseType: 'arraybuffer' })
  .then((response) => {
    const ifcFile = Buffer.from(response.data, 'binary'); 

    let ifcConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: jsonPayload["ifc-to-lbd_location"],
      headers: { 
        'Content-Type': 'application/octet-stream'
      },
      data : ifcFile,
    };

    axios.request(ifcConfig)
    .then((response) => {
      const lbdFile = Buffer.from(response.data, 'binary');
      
      let lbdConfig = {
        method: 'post',
        maxBodyLength: Infinity,
        url: jsonPayload["qto_location"],
        headers: { 
          'Content-Type': 'application/octet-stream'
        },
        data : lbdFile,
      };

      axios.request(lbdConfig)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    })
    .catch((error) => {
      console.log(error);
    });
  })
  .catch((error) => {
    console.log(error);
  });
};

module.exports = {
  ifcToQtoGET,
  ifcToQtoPOST,
};
