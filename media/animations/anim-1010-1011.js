
function anim_1010_1011() {
    chart.animate({
        config: {
            channels: {
                y: { set: ['type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: 'type',
                label: { set: ['code'] },
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '13em',
                marker: { label: { position: 'right', fontSize:'1em'} },
                yAxis: { label: { fontSize: '1.2em', paddingRight: '1.3em' } },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                				 title: { paddingTop: '2.5em' } }
            }
        }
    }
    );
}
