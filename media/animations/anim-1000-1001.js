function anim_1000_1001() {
    chart.animate({
        config: {
            channels: {
                y: { set: null, range: {min: '0%', max: '100%' } },
            x: { set: ['code', 'file' ], range: { min: '0%', max: '100%' } },
            color: { set: null },
            label: { set: null },
        },
        title: null, //1 code1
        sort: 'byValue'
        },
        style: {
            fontSize: '13',
            logo:{filter: 'lightness(-0.2)' },
        legend:{paddingLeft:'5.789473684'},
        plot: {
            paddingLeft: '13em',
            marker: { label: { position: 'center', fontSize:'1.3em'} },
            yAxis: { label: { fontSize: 0, paddingRight: '1.3em'} },
            xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
        }
        }},
        { duration: 1 }
    )
    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['file'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                label: {set:null},
                color:  { detach: ['type'] }
            },
            title: null, //  '7 code+ Files 1',
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
