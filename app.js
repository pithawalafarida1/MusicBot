//modules and variables for running server
const express = require('express');
var app = express();
const hostname = '127.0.0.1';
const port = 3000;

//variables for static files
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'/public/')))
app.set('view engine','html');
app.engine('html', require('ejs').renderFile);


//Gets the name home page
app.get('/',(req,res)=>{
    res.render('screen.html');
})

//for launching the server
app.listen(port,(req,res)=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})

//<-----------DIALOGFLOW API BEGINS HERE-------------->

//dialogflow API 
const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

// Replace with your own project ID and credentials file path
const projectId = 'beatbot-iuaq';
const credentialsPath = path.join(__dirname,'/ProjectKey/application_default_credentials.json');


// Create a new session client
const sessionClient = new dialogflow.SessionsClient({
  projectId,
  keyFilename: credentialsPath
});

// The path to your Dialogflow agent's knowledge base
const sessionPath = sessionClient.projectAgentSessionPath(projectId, uuid.v4());

// The language code for the query (e.g. 'en-US')
const languageCode = 'en-US';

//Post request from user
app.post('/botmessage',(req,res)=>{
     console.log(req.body.msg);


    // The request object to send to Dialogflow
const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: req.body.msg,
        languageCode: languageCode
      }
    }
  };
  
  // Send the request to Dialogflow
  sessionClient.detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      console.log(`Intent detected: ${result.intent.displayName}`);
      console.log(`Response: ${result.fulfillmentText}`);
      var answer = result.fulfillmentText
      res.send({Reply: answer})
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
  
    

    
})

//<------------DIALOGFLOW API END HERE--------->