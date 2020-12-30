const express = require('express');

const app = express();
const port = 8000;

const ipl = require('./ipl');


console.log(ipl.noOfMatchesPlayedPerYr());
console.log(ipl.noOfMatchesWonPerTeamPerYr());
console.log(ipl.extraRunsConceded());
console.log(ipl.top10EcoBowlers2015());


app.listen(port, (err)=> {
    if(err){
        console.log(`Error in running server on port: ${port}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});