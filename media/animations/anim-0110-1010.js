function anim_0110_1010() {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: { min: '0%', max: '110%' } },
                x: { set: ['type'] },
            color: { set:['type']},
            label: { set: ['$count'] },
            },
            title: null, //  '10 File count + types 2',
            sort: 'byValue',
            legend: null,
                reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                xAxis: { label: { angle: -0.5, fontSize:  '1em' } }
            }
        }},
        { duration: 1 }
    )
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', 'file'], range: {min: '0%', max: '110%' } },
                x: { set: ['type'] },
            label: { set: null },
            },
            title: null, //  '11 File count + type 3',
            sort: 'byValue',
            legend: null,
                reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'top'} },
                xAxis: { label: { angle: -0.5, fontSize:  '1em' } }
            }
        }},
        { duration: 1 }
    ))
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code', 'file'] },
                color: 'type',
                label: null,
                
            },
            title: null, //  '5 code + types 3'
            legend: null,
            sort: 'byValue',
            reverse: false
        },
        style: {
            plot: {
                paddingLeft: '13em',
                marker: { label: { position: 'right'} },
                yAxis: { label: { fontSize: '0em', paddingRight: '1.3em' } },
                xAxis: { label: { angle: 0, fontSize:  '1em' },
                				 title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: 'type',
                label: { set: ['code'] },
            },
            title: null, //  '4 code + types 2',
            legend: null,
            sort: 'byValue',
            reverse: false
        },
        style: {
            plot: {
                paddingLeft: '13em',
                marker: { label: { position: 'right', fontSize:'1em'} },
                yAxis: { label: { fontSize: '1.2em', paddingRight: '1.3em' } },
                xAxis: { label: { angle: 0, fontSize:  '1em' },
                				 title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ));
}
