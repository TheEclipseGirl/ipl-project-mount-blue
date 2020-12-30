const deliveries = require('../data/deliveries.json');
const matches = require('../data/matches.json');

module.exports.noOfMatchesPlayedPerYr = () => {
    totalMatchesPlyforEachYr = {};
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