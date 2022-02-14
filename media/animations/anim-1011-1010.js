
function anim_1011_1010() {
    chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code', 'file'] },
                color: 'type',
                label: null
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '13em',
                yAxis: { label: { fontSize: '0em', paddingRight: '1.3em' } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                				 title: { paddingTop: '2.5em' } }
            }
        }
    });
}
