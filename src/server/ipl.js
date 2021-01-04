// Question:1
module.exports.noOfMatchesPlayedPerYr = (matches) => {
   return matches.reduce((acc, match) => {
        if(!acc[match.season]){
            acc[match.season] = 1;
        }else{
            acc[match.season] += 1;
        }
        return acc;
    }, {});
}

// Question:2
module.exports.noOfMatchesWonPerTeamPerYr = (matches)=>{
    return matches.reduce((acc, i) => {
        if(!acc[i.season]){
            acc[i.season] = {}
            acc[i.season][i.winner] = 1
        }else{
            if(i.winner === 'Rising Pune Supergiant'){
                i.winner = 'Rising Pune Supergiants';
            }
            if(!acc[i.season][i.winner]){
                acc[i.season][i.winner] = 1;
            }else{
                acc[i.season][i.winner] += 1;
            }
        }
        return acc;
    }, {});
}
// Question:3
module.exports.extraRunsConcededInAYear = (matches , deliveries, year)=>{
    let matchId = matches.reduce((acc, match) => {
        if(match.season == year){
          acc[match.id] = match.season;
        }
        return acc;
    }, {});

    return deliveries.reduce((acc, delivery) => {
        if(matchId[delivery.match_id]){
            if(!acc[delivery.bowling_team]){
                acc[delivery.bowling_team] = delivery.extra_runs;
            }else{  
                acc[delivery.bowling_team] = (parseInt(acc[delivery.bowling_team]) + parseInt(delivery.extra_runs)).toString();
            }
        }
        return acc;
    }, {});
}
// Question:4
module.exports.topEconomicBowlerInAYear = (matches , deliveries, year, totalRanks) => {
    let economy = [];

    let matchId = matches.reduce((acc, i) => {
        if(i.season === year){
          acc[i.id] = i.season;
        }
        return acc;
    }, {});

    let bowlersInYr = deliveries.reduce((acc, i) => {
        if(matchId[i.match_id]){
            if(!acc[i.bowler]){
                acc[i.bowler] = {};
                if(i.wide_runs === '0' && i.noball_runs === '0' && i.penalty_runs == '0'){
                    acc[i.bowler]['totalBowls'] = '1';
                }else{
                    acc[i.bowler]['totalBowls'] = '0';
                }
                acc[i.bowler]['totalRunsGiven'] = i.total_runs;
            }else{
                if(i.wide_runs === '0' && i.noball_runs === '0' && i.penalty_runs == '0'){
                    acc[i.bowler]['totalBowls'] = (parseInt(acc[i.bowler]['totalBowls']) + 1).toString();
                }
                acc[i.bowler]['totalRunsGiven'] += (parseInt(acc[i.bowler]['totalRunsGiven']) + parseInt(i.total_runs)).toString;
            }
        }
        return acc;
    }, {});

    for(let i in bowlersInYr){
        bowlersInYr[i]['totalOvers'] = (parseInt(bowlersInYr[i].totalBowls) / 6).toString();
        let bowlerWithEco = {
            'name': i,
            'economy': (parseInt(bowlersInYr[i]['totalRunsGiven']) / parseInt(bowlersInYr[i]['totalOvers'])).toString()
        }
        economy.push(bowlerWithEco);
    }

    economy.sort((a, b) => (parseInt(a.economy) > parseInt(b.economy)) ? 1 : -1);

    let arrayOFObjects = [];

    for(let i = 1; i <= totalRanks; i++) {
        arrayOFObjects.push(economy[i].name);
    }

    return {
        'result' : arrayOFObjects
    }
}