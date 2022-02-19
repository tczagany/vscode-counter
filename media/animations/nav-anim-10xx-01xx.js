function nav_anim_10xx_01xx(chart, dirLevel) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: ['dir' + dirLevel] },
            color: { set: null },
            label: { set: ['$count'] },
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
//                paddingLeft: '8em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                    xAxis: { label: { angle: -0.7, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 2 }
    );
}
