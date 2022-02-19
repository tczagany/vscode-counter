
function nav_anim_init(chart) {
    
    return chart.animate({
        config: {
            channels: {
                y: { set: ['dir0'], range: {min: '0%', max: '100%' } },
                x: { set: ['code'], range: { min: '0%', max: '110%' } },
                color: { set: null },
                label: { set: ['code'] },
            },
            title: null,
            legend: null
        },
        style: {
            fontSize: '12',
            logo:{filter: 'lightness(1)' },
            plot: {
                paddingLeft: '6em',
                paddingRight: '2em',
                marker: { label: { fontSize:'1em'} },
                yAxis: { label: { fontSize: '1em', paddingRight: '1em'} },
                xAxis: { label: { angle: 0, fontSize:  '1em' }, title: { paddingTop: '2.2em' } }
            }
        }
    },
    {
        duration: 0.2
    })
    
    .then(chart => {
        chart.feature('tooltip',true);
        return chart;
    })
    
    ;
}