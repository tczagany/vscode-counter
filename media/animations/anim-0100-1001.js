function anim_0100_1001(chart) {

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
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    )
    
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', 'file','type'], range: { min: '0%', max: '100%' } },
                x: { set: null },
                color:  { detach: ['type'] },
                label: {set:null}
            },
            title: null, //  '7 code + Files 1',
            sort: 'byValue',
            legend: null,
                reverse: false,
        },
        style: {
            plot: {
                paddingLeft: '13em',
                yAxis: { label: { fontSize: 0  } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['file','type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color:  { detach: ['type'] },
                label: {set:null}
            },
            title: null, //  '7 code + Files 1',
            sort: 'byValue',
            legend: null,
                reverse: false,
        },
        style: {
            plot: {
                paddingLeft: '13em',
                yAxis: { label: { fontSize: 0  } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ));
}
