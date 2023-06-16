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

  axios.get(jsonPayload["ifc_location"], { responseType: 'arraybuffer' })
  .then((response) => {
    const ifcFile = Buffer.from(response.data, 'binary'); 

    let ifcConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: jsonPayload["ifc-to-lbd_location"],
      headers: { 
        'Content-Type': 'application/ifc'
      },
      data: ifcFile,
    };

    return axios.request(ifcConfig);
  })
  .then((response) => {
    const lbdFile = Buffer.from(response.data, 'binary');

    let lbdConfig = {
      method: 'post',
      maxBodyLength: Infinity,
      url: jsonPayload["qto_location"],
      headers: { 
        'Content-Type': 'text/turtle'
      },
      data: lbdFile,
    };

    return axios.request(lbdConfig);
  })
  .then((response) => {
    res.status(200).json(response.data);
  })
  .catch((error) => {
    console.log(error);

    // Handle the error and send an appropriate response to the client
    let errorMessage = 'An error occurred while processing the request.';
    if (error.response.status) {
      res.status(error.response.status).json(error.message)
    }

    res.status(500).json({ error: errorMessage });
  });
};

module.exports = {
  ifcToQtoGET,
  ifcToQtoPOST,
};
