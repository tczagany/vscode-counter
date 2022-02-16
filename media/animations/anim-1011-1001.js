function anim_1011_1001() {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['file','type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color:  { set: ['type'] }
            },
            title: null, //  '8 code + types + Files 2',
            sort: 'none',
            legend: 'color',
                reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '0.6em',
                yAxis: { label: { fontSize: 0 } },
                xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    )

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
