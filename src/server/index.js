const express = require('express');

const app = express();
const port = 8000;
const path = require('path');

const ipl = require('./ipl');
const utils = require('./utils');

app.use(express.static(path.join(__dirname + '/../public/assets')));

const router = express.Router();

const getDeliveriesJson = new Promise((resolve, reject) => {
    let deliveriesJson = utils.convertCsvToJson('deliveries.csv');
    resolve(deliveriesJson);
});

const getMatchesJson = new Promise((resolve, reject) => {
    let matchesJson = utils.convertCsvToJson('matches.csv');
    resolve(matchesJson);
});

Promise.all([getDeliveriesJson, getMatchesJson]).then((values) => {
    let deliveriesJson = values[0];
    let matchesJson = values[1];

    let matchesPlayedPerYear = ipl.noOfMatchesPlayedPerYr(matchesJson);
    let matchesWonPerYear = ipl.noOfMatchesWonPerTeamPerYr(matchesJson);
    let extraRunsConceededPerYear = ipl.extraRunsConcededInAYear(matchesJson , deliveriesJson, '2016');
    let economicalBowlers = ipl.topEconomicBowlerInAYear(matchesJson , deliveriesJson, '2015', 10);


    matchesPlayedPerYear = JSON.stringify(matchesPlayedPerYear);
    matchesWonPerYear = JSON.stringify(matchesWonPerYear);
    extraRunsConceededPerYear = JSON.stringify(extraRunsConceededPerYear);
    economicalBowlers = JSON.stringify(economicalBowlers);

    utils.createNewFile('noOfMatchesPlayedPerYr.json', matchesPlayedPerYear);
    utils.createNewFile('noOfMatchesWonPerTeamPerYr.json', matchesWonPerYear);
    utils.createNewFile('extraRunsConcededInAYear.json', extraRunsConceededPerYear);
    utils.createNewFile('topEconomicBowlerInAYear.json', economicalBowlers);


    app.get('/' , (req , res)=>{
        return res.sendFile(path.join( __dirname + '/../public/index.html'));
    });
    // API for extra Runs ConcededIn A Year
    app.get('/api/v1/get-extra-runs-conceded',(req , res) =>{
        return res.sendFile(path.join( __dirname + '/../public/output/extraRunsConcededInAYear.json'));
    });
    // API for no of matches played per year
    app.get('/api/v1/get-no-of-matches-played-per-yr' , (req , res) =>{
        return res.sendFile(path.join( __dirname + '/../public/output/noOfMatchesPlayedPerYr.json'));
    }); 
    // API for no of matches won per team
    app.get('/api/v1/get-no-of-matches-won-per-team' , (req , res) =>{
        return res.sendFile(path.join( __dirname + '/../public/output/noOfMatchesWonPerTeamPerYr.json'));
    });
    // Top Economic Bowlers
    app.get('/api/v1/get-top-eco-bowlers' , (req , res) =>{
        return res.sendFile(path.join( __dirname + '/../public/output/topEconomicBowlerInAYear.json'));
    });
});

app.listen(port, (err)=> {
    if(err){
        console.log(`Error in running server on port: ${port}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});