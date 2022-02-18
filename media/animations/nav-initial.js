
function nav_anim_init(chart) {
    
    return chart.animate({
        config: {
            channels: {
                y: { set: ['dir0'], range: {min: '0%', max: '100%' } },
                x: { set: ['code'], range: { min: '0%', max: '100%' } },
                color: { set: null },
                label: { set: ['code'] },
            },
            title: null,
            legend: null
        },
        style: {
            fontSize: '13',
            logo:{filter: 'lightness(-0.2)' },
            plot: {
                marker: { label: { position: 'right', fontSize:'1em'} },
                yAxis: { label: { fontSize: '1em', paddingRight: '1.3em'} },
                xAxis: { label: { angle: 0, fontSize:  '1em' }, title: { paddingTop: '2.5em' } }
            }
        }
    },
    {
        duration: 1
    });
}