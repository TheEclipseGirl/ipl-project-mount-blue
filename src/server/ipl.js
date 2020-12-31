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
    // let ans= {};
    // matches.map( (i)  => {
    //     if(!ans[i.season]){
    //         ans[i.season] = {}
    //         ans[i.season][i.winner] = 1
    //     }else{
    //         if(!ans[i.season][i.winner]){
    //             ans[i.season][i.winner] = 1;
    //         }else{
    //             ans[i.season][i.winner] += 1;

    //         }
    //     }
    // });

    const ans = matches.reduce((acc, i) => {
        if(!acc[i.season]){
            acc[i.season] = {}
            acc[i.season][i.winner] = 1
        }else{
            if(!acc[i.season][i.winner]){
                acc[i.season][i.winner] = 1;
            }else{
                acc[i.season][i.winner] += 1;

            }
        }
        return acc;
    }, {});

    return ans;
}
// Question:3
module.exports.extraRunsConcededInAYear = (matches , deliveries, year)=>{
    let ans={};
    let matchId = {};
    matches.map((i)=>{
        if(i.season == year){
            matchId[i.id] = i.season;
        }
    });
    deliveries.map((i) => {
        if(matchId[i.match_id]){
            if(!ans[i.bowling_team]){
                ans[i.bowling_team] = i.extra_runs;
            }else{  
                ans[i.bowling_team] = (parseInt(ans[i.bowling_team]) + parseInt(i.extra_runs)).toString();
            }
        }
    });
    return ans;
}
// Question:4
module.exports.topEconomicBowlerInAYear = (matches , deliveries, year, totalRanks) => {
    let ans={};
    let matchId = {};
    let bowlersInYr = {};
    let economy = [];
    matches.map((i)=>{
        if(i.season === year){
            matchId[i.id] = i.season;
        }
    });
    deliveries.map((i) => {
        if(matchId[i.match_id]){
            if(!bowlersInYr[i.bowler]){
                bowlersInYr[i.bowler] = {};
                if(i.wide_runs === '0' && i.noball_runs === '0' && i.penalty_runs == '0'){
                    bowlersInYr[i.bowler]['totalBowls'] = '1';
                }else{
                    bowlersInYr[i.bowler]['totalBowls'] = '0';
                }
                bowlersInYr[i.bowler]['totalRunsGiven'] = i.total_runs;
            }else{
                if(i.wide_runs === '0' && i.noball_runs === '0' && i.penalty_runs == '0'){
                    bowlersInYr[i.bowler]['totalBowls'] = (parseInt(bowlersInYr[i.bowler]['totalBowls']) + 1).toString();
                }
                bowlersInYr[i.bowler]['totalRunsGiven'] += (parseInt(bowlersInYr[i.bowler]['totalRunsGiven']) + parseInt(i.total_runs)).toString;
            }
        }
    });

    for(let i in bowlersInYr){
        bowlersInYr[i]['totalOvers'] = (parseInt(bowlersInYr[i].totalBowls) / 6).toString();
        let bowlerWithEco = {
            'name': i,
            'economy': (parseInt(bowlersInYr[i]['totalRunsGiven']) / parseInt(bowlersInYr[i]['totalOvers'])).toString()
        }
        economy.push(bowlerWithEco);
    }

    economy.sort((a, b) => (parseInt(a.economy) > parseInt(b.economy)) ? 1 : -1);

    for(let i = 1; i <= totalRanks; i++){
        ans[`rank_${i}`] = {};
        ans[`rank_${i}`]['name'] = economy[i].name;    }
    return ans;
}