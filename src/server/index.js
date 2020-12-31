const express = require('express');

const app = express();
const port = 8000;
const path = require('path');

const ipl = require('./ipl');
const utils = require('./utils');

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

    let matches_played_per_year = ipl.noOfMatchesPlayedPerYr(matchesJson);
    let matches_won_per_team_per_year = ipl.noOfMatchesWonPerTeamPerYr(matchesJson);
    let extra_runs_conceded_per_team = ipl.extraRunsConcededInAYear(matchesJson , deliveriesJson, '2016');
    let economical_bowlers = ipl.topEconomicBowlerInAYear(matchesJson , deliveriesJson, '2015', 10);


    matches_played_per_year = JSON.stringify(matches_played_per_year);
    matches_won_per_team_per_year = JSON.stringify(matches_won_per_team_per_year);
    extra_runs_conceded_per_team = JSON.stringify(extra_runs_conceded_per_team);
    economical_bowlers = JSON.stringify(economical_bowlers);

    utils.createNewFile('noOfMatchesPlayedPerYr.json', matches_played_per_year);
    utils.createNewFile('noOfMatchesWonPerTeamPerYr.json', matches_won_per_team_per_year);
    utils.createNewFile('extraRunsConcededInAYear.json', extra_runs_conceded_per_team);
    utils.createNewFile('topEconomicBowlerInAYear.json', economical_bowlers);


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