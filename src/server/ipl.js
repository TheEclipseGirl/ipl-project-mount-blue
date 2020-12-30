const deliveries = require('../data/deliveries.json');
const matches = require('../data/matches.json');

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