function anim_1011_0110() {

    chart.animate({
        config: {
            channels: {
                y: { set: ['type', 'file'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color:  { set: ['type'] }
            },
            title: null, //  '6 code + types + Files 1',
            legend: 'color',
                sort: 'none',
                reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '0.6em',
                yAxis: { label: { fontSize: '0em' } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    )
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
                    xAxis: { label: { angle: -0.5, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))
  
    ;

}
