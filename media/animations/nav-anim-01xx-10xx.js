function nav_anim_01xx_10xx(chart, dirLevel) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['dir' + dirLevel], range: { min: '0%', max: '100%' } },
                x: { set: ['code'] },
                color: { set: null },
                label: { set: ['code'] },
            },
            title: null, //  '13 File count 2',
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 2 }
    );
}
