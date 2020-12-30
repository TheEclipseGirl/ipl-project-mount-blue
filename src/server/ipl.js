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
// Question:3
module.exports.extraRunsConceded = ()=>{
    let ans={};
    let matchId = {};
    matches.map((i)=>{
        if(i.season === 2016){
            matchId[i.id] = i.season;
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
// Question:4
module.exports.top10EcoBowlers2015 = () => {
    let ans={};
    let matchId = {};
    let bowlersIn2015 = {};
    let economy = [];
    matches.map((i)=>{
        if(i.season === 2015){
            matchId[i.id] = i.season;
        }
    });
    deliveries.map((i) => {
        if(matchId[i.match_id]){
            if(!bowlersIn2015[i.bowler]){
                bowlersIn2015[i.bowler] = {};
                if(i.wide_runs === 0 || i.noball_runs === 0 || i.penalty_runs == 0){
                    bowlersIn2015[i.bowler]['totalBowls'] = 1;
                }else{
                    bowlersIn2015[i.bowler]['totalBowls'] = 0;
                }
                bowlersIn2015[i.bowler]['totalRunsGiven'] = i.total_runs;
            }else{
                if(i.wide_runs === 0 || i.noball_runs === 0 || i.penalty_runs == 0){
                    bowlersIn2015[i.bowler]['totalBowls'] += 1;
                }
                bowlersIn2015[i.bowler]['totalRunsGiven'] += i.total_runs;
            }
        }
    });

    for(let i in bowlersIn2015){
        bowlersIn2015[i]['totalOvers'] = bowlersIn2015[i].totalBowls / 6;
        let bowlerWithEco = {
            'name': i,
            'economy': bowlersIn2015[i]['totalRunsGiven'] / bowlersIn2015[i]['totalOvers']
        }
        economy.push(bowlerWithEco);
    }

    economy.sort((a, b) => (a.economy > b.economy) ? 1 : -1);

    for(let i = 0; i <= 10; i++){
        ans[`rank_${i}`] = {};
        ans[`rank_${i}`]['name'] = economy[i].name;
        ans[`rank_${i}`]['economy'] = economy[i].economy;
    }

    return ans;
}