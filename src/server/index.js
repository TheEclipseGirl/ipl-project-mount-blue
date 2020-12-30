const express = require('express');

const app = express();
const port = 8000;

const ipl = require('./ipl');
const createFile = require('./createFile');

let a =  ipl.noOfMatchesPlayedPerYr();
let b = ipl.noOfMatchesWonPerTeamPerYr();
let c = ipl.extraRunsConceded();
let d = ipl.top10EcoBowlers2015();

a = JSON.stringify(a);
b = JSON.stringify(b);
c = JSON.stringify(c);
d = JSON.stringify(d);
createFile.newFile('noOfMatchesPlayedPerYr.json', a);
createFile.newFile('noOfMatchesWonPerTeamPerYr.json', b);
createFile.newFile('extraRunsConceded.json', c);
createFile.newFile('top10EcoBowlers2015.json', d);



app.listen(port, (err)=> {
    if(err){
        console.log(`Error in running server on port: ${port}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});