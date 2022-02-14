
function anim_1011_1001() {
    chart.animate({
        config: {
            channels: {
                y: { set: ['file','type'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: { detach: ['type'] },
                label: { set:null }
            },
            title: null,
            sort: 'byValue',
            legend: null,
        },
        style: {
            plot: {
                paddingLeft: '13em',
                yAxis: { label: { fontSize: 0  } },
                xAxis: { label: { angle: 0, fontSize:  '1em' }, title: { paddingTop: '2.5em' } }
            }
        }
    });
}
