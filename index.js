'use strict';
// Lay out requirements
const express = require('express');
const bodyParser = require('body-parser');
var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

// setup app as an express (part of the scotch example)
var app = express();

// setup restService as an express
const restService = express();

// set restService to use the bodyParser
restService.use(bodyParser.json());

restService.post('/hook', function (req, res) {

    console.log('hook request');

    try {
        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                // If we got some kind of result back then set initialize speech to '' so it's not the 'empty speech' string
                speech = '';

                // If there's a fulfillment object then put the contents of the fulfillment speech into the speech variable
                //  Can also use requestBody.result.parameters to access parameter variables.
                //if (requestBody.result.fulfillment) {
                //   speech += requestBody.result.fulfillment.speech;
                //    speech += ' ';
                //}
                var schoolName = requestBody.result.parameters.schoolName;
                var lunchDate = requestBody.result.parameters.date;
                
                // Check names of schools and match to names on 
                url = 'http://www.imdb.com/title/tt1229340/';
              
              
                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        console.log('result: ', speech);

        return res.json({
            speech: speech,
            displayText: speech,
            source: 'apiai-webhook-sample'
        });
    } catch (err) {
        console.error("Can't process request", err);

        return res.status(400).json({
            status: {
                code: 400,
                errorType: err.message
            }
        });
    }
});

restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
});












app.get('/scrape', function(req, res){

  //All the web scraping magic will happen here

})

app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
