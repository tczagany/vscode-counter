function anim_0100_1000(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: { min: '0%', max: '100%' } },
                x: { set: ['code'], range: { min: '0%', max: '100%' } },
                color: { set: null },
                label: { set: ['code'] },
            },
            title: null, //1 code 1
        },
        style: {
            legend: { paddingLeft: '5.789473684' },
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'center' } },
                yAxis: { label: { paddingRight: '1.3em' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 2 }
    );
}
