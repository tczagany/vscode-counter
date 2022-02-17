function anim_1011_1010(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code', 'file'] },
                color: 'type',
                label: null
            },
            title: null, //  '5 code + types 3'
            legend: null,
            reverse: false,
            sort: 'byValue'
        },
        style: {
            plot: {
                paddingLeft: '13em',
                yAxis: { label: { fontSize: '0em', paddingRight: '1.3em' } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                				 title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 2 }
    )

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
            reverse: false,
            sort: 'byValue'
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
        { duration: 0.5 }
    ));
}
