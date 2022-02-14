
function anim_1001_1011() {
    chart.animate({
        config: {
            channels: {
                y: { set: ['file','type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: { set: ['type'] }
            },
            title: null,
            sort: 'none',
            legend: 'color',
            reverse: false
        },
        style: {
            plot: {
                paddingLeft: '0.6em',
                yAxis: { label: { fontSize: 0 } },
                xAxis: { label: { angle: 0, fontSize:  '1em' }, title: { paddingTop: '2.5em' } }
            }
        }
    });
}
