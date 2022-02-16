function anim_0100_0110() {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: null },
            color: { set: null },
            label: { set: ['$count'] },
            },
            title: null, //  '13 File count 2',
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'center', fontSize: '1.3em'} },
                xAxis: { label: { angle: -0.5, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    )
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', 'type', 'file'], range: {min: '0%', max: '100%' } },
                x: { set: null },
            label: { set: null },
            color: { set:['type']}
            },
            title: null, //  '12 File count 1',
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'center', fontSize: '1.3em'} },
                xAxis: { label: { angle: -0.5, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', 'file'], range: { min: '0%', max: '110%' } },
                x: { set: ['type'] },
            color: { set:['type']}
            },
            title: null, //  '9 File count + types 1',
            sort: 'byValue',
            legend: null,
                reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                xAxis: { label: { angle: -0.5, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: { min: '0%', max: '110%' } },
                x: { set: ['type'] },
            label: { set: ['$count'] },
            color: { set:['type']}
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
                xAxis: { label: { angle: -0.5, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ));
}
