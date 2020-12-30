const express = require('express');

const app = express();
const port = 8000;

const deliveries = require('../data/deliveries.json');
const matches = require('../data/matches.json');



app.listen(port, (err)=> {
    if(err){
        console.log(`Error in running server on port: ${port}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});