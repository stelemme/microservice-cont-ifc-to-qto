# IFC-to-QTO Controller Microservice
## Installation
To install this Microservice, make sure Node.js 19 or higher is installed on your device. Installing the Microservice can be done by running the following command. The command makes sure all the dependencies present in the [package.json](https://github.com/stelemme/microservice-cont-ifc-to-qto/blob/main/package.json) file are correctly installed.
```
npm install
```
## Running the Microservice
The Microservice can be run normally or in development mode respectively with the following commands.
```
npm run start
npm run start:dev
```
## Using the Microservice
The functionality of this Microservice can be acces via the following endpoint.
  
[http://localhost:3000/cont/ifc-to-qto](http://localhost:3000/cont/ifc-to-qto)
  
This endpoint has a GET and POST method. The GET response of the endpoint returns a JSON object that specifies which methods and data types are supported by the endpoint. This endpoint must receive an IFC-file. The POST response then returns the converted LBD-file, in the turtle format, if the IFC-file is correctly sent in the body of the request. The process can be tested using Postman or a Controller Microservice.
