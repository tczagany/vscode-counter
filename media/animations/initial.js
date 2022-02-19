
function anim_init(chart) {
    
    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: {min: '0%', max: '100%' } },
                x: { set: ['code' ], range: { min: '0%', max: '100%' } },
                color: { set: null },
                label: { set: ['code' ] },
            },
            title: null,
            legend: null
        },
        style: {
            fontSize: '12',
            logo:{filter: 'lightness(-0.2)' },
            legend:{width:'9em', marker:{size:'11'}, paddingLeft:'0', paddingRight:'0'},
            plot: {
                paddingLeft: '12em',
                marker: { label: { position: 'center', fontSize:'1em'} },
                yAxis: { label: { fontSize: '1em', paddingRight: '1em'} },
                xAxis: { label: { angle: 0, fontSize:  '1em' }, title: { paddingTop: '2.2em' } }
            }
        }
    },
    {
        duration: 1
    })

    .then(chart => {
        chart.feature('tooltip',true);
        return chart;
    })
    
    ;
}