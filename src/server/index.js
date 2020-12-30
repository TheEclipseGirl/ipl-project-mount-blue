const express = require('express');

const app = express();
const port = 8000;

const ipl = require('./ipl');
const utils = require('./utils');

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

    utils.newFile('noOfMatchesPlayedPerYr.json', matches_played_per_year);
    utils.newFile('noOfMatchesWonPerTeamPerYr.json', matches_won_per_team_per_year);
    utils.newFile('extraRunsConcededInAYear.json', extra_runs_conceded_per_team);
    utils.newFile('topEconomicBowlerInAYear.json', economical_bowlers);
});

app.listen(port, (err)=> {
    if(err){
        console.log(`Error in running server on port: ${port}`);
        return;
    }
    console.log(`Server is up and running at port: ${port}`);
});