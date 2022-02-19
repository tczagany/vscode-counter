function anim_1010_1000(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: 'type',
                label: { set: ['code'] },
            },
            title: null, //  '4 code + types 2',
            sort: 'byValue',
            reverse: false,
        },
        style: {
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'right'} },
                yAxis: { label: { fontSize: '1em', paddingRight: '1.3em' } },
                xAxis: { label: { angle: 0 } }
            }
        }},
        { duration: 0.1 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: 'type',
                label: { set: null },
            },
            title: null, // 3 code + types 1
            sort: 'byValue',
            reverse: false,
        },
        style: {
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'right'} },
                yAxis: { label: { fontSize: '1em' } },
                xAxis: { label: { angle: 0 } }
            }
        }},
        { duration: 0.5 }
    ))
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: null, range: {min: '0%', max: '100%' } },
                x: { set: ['type', 'code' ], range: { min: '0%', max: '100%' } },
                color: 'type',
                label: null
            },
            title: null, // 2 code 2
            sort: 'byValue',
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'center'} },
                yAxis: { label: { fontSize: '1em', paddingRight: '1.3em' } },
                xAxis: { label: { angle: 0 } }
            }
        }},
        { duration: 2 }
    ))
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: null, range: {min: '0%', max: '100%' } },
            x: { set: ['code' ], range: { min: '0%', max: '100%' } },
            color: { set: null },
            label: { set: ['code' ] },
        },
        title: null, //1 code 1
        },
        style: {
            logo:{filter: 'lightness(-0.2)' },
        legend:{paddingLeft:'5.789473684'},
        plot: {
            paddingLeft: '9em',
            marker: { label: { position: 'center'} },
            yAxis: { label: { fontSize: '1em', paddingRight: '1.3em'} },
            xAxis: { label: { angle: 0 } }
        }
        }},
        { duration: 0.5 }
    ));
}
