function nav_anim_01xx_10xx(chart, dirLevel) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['dir' + dirLevel], range: {min: '0%', max: '100%' } },
                x: { set: ['code'] },
            color: { set: null },
            label: { set: ['code'] },
            },
            title: null, //  '13 File count 2',
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '8em',                
                marker: { label: { position: 'right', fontSize: '1em'} },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    );
}
