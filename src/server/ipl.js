const deliveries = require('../data/deliveries.json');
const matches = require('../data/matches.json');

// Question:1

module.exports.noOfMatchesPlayedPerYr = () => {
   let totalMatchesPlyforEachYr = {};
    matches.map(i => {
        if(!totalMatchesPlyforEachYr[i.season]){
            totalMatchesPlyforEachYr[i.season] = 1;
        }else{
            totalMatchesPlyforEachYr[i.season] += 1;
        }
    });
    // console.log('totalMatchesPer',totalMatchesPlyforEachYr);

    return totalMatchesPlyforEachYr;
}

// Question:2
module.exports.noOfMatchesWonPerTeamPerYr = ()=>{
    let ans= {};
    matches.map( (i)  => {
        if(!ans[i.season]){
            ans[i.season] = {}
            ans[i.season][i.winner] = 1
        }else{
            if(!ans[i.season][i.winner]){
                ans[i.season][i.winner] = 1;
            }else{
                ans[i.season][i.winner] += 1;

            }
        }
    });
    return ans;
}
// Questioh:3
module.exports.extraRunsConceded = ()=>{
    let ans={};
    let matchId = {};
    matches.map((i)=>{
        if(i.season === 2016){
            matchId[i.id] = i.season
        }
    });

    deliveries.map((i) => {
        if(matchId[i.match_id]){
            if(!ans[i.bowling_team]){
                ans[i.bowling_team] = i.extra_runs;
            }else{
                ans[i.bowling_team] += i.extra_runs;
            }
        }
    });
    return ans;
}