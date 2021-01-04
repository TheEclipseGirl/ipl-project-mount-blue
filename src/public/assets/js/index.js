const createBarGraph = (tabs ,textXAxis, textYAxis, seriesName, caption) => {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: textXAxis
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: textYAxis
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: `<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> ${caption}<br/>`
        },

        series: [
            {
                name: seriesName,
                colorByPoint: true,
                data: tabs
            }
        ]
    });
}

const createMultiBarGraph = (textXAxis, textYAxis, categories, series) => {
    Highcharts.chart('container', {
        chart: {
            type: 'column'
        },
        title: {
            text: textXAxis
        },
        xAxis: {
            categories: categories,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: textYAxis
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: series
    });
}

const showGraph = (route)=>{

    axios.get(`http://localhost:8000/api/v1/${route}`)
    .then((response)=>{

        if(route === 'get-extra-runs-conceded' || route === 'get-no-of-matches-played-per-yr' || route === 'get-top-eco-bowlers'){
            let tabs = [];
            let textXAxis, textYAxis, seriesName, caption;

            if(route === 'get-extra-runs-conceded'){
                textXAxis = 'Team Names';
                textYAxis = 'Extra runs conceded in a year';
                seriesName = 'Runs';
                caption = 'runs';
                for(let i in response.data) {
                    tabs.push({
                        'name': i,
                        'y': parseInt(response.data[i])
                    });
                }
            }else if(route === 'get-no-of-matches-played-per-yr'){
                textXAxis = 'Years';
                textYAxis = 'Number of matches';
                seriesName = 'Matches'
                caption = 'matches';
                for(let i in response.data) {
                    tabs.push({
                        'name': i,
                        'y': parseInt(response.data[i])
                    });
                }
            }else{
                textXAxis = 'Player Name';
                textYAxis = 'Rank';
                seriesName = 'Rank'
                caption = 'rank';
                let rank = 1;
                for(let i in response.data.result) {
                    tabs.push({
                        'name': response.data.result[i],
                        'y': rank
                    });
                    rank++;
                }
            }                     
            // Create the chart
            createBarGraph(tabs ,textXAxis, textYAxis, seriesName, caption);
        }
        else{
            let categories = [];
            let series = [];
            for(let i in response.data){
                categories.push(i);
            }

            let teamsAndDataList = {};
            for(let i in response.data) {
                for(let j in response.data[i]){
                    if(!teamsAndDataList[j]) {
                        teamsAndDataList[j] = [];
                        teamsAndDataList[j].push(response.data[i][j]);
                    }else{
                        teamsAndDataList[j].push(response.data[i][j]);
                    }
                }
            }
            for(let i in teamsAndDataList) {
                if(i !== ''){
                    series.push({
                        'name': i,
                        'data': teamsAndDataList[i]
                    });
                }
            }
            createMultiBarGraph('Teams', 'Matches Won', categories, series);
        }
        
    })
    .catch((error)=>{
        console.log('error' , error);
    });
}

document.getElementById('question1').addEventListener('click',()=>{
    showGraph('get-extra-runs-conceded');
});
document.getElementById('question2').addEventListener('click', ()=>{
    showGraph('get-no-of-matches-played-per-yr');
});

document.getElementById('question3').addEventListener('click', ()=>{
    showGraph('get-no-of-matches-won-per-team');
});

document.getElementById('question4').addEventListener('click', ()=>{
    showGraph('get-top-eco-bowlers');
});