function nav_anim_10xx_filter_bw(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel + 1);
    let prevDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir] }, 
                x: { set: ['code'] },
                label: { set: null }
            }
        }},
        { duration: 0.4 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: null }, 
                x: { set: ['code', crDir] }
            }
        }
    },
    { duration: 0.4 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['code'] }
            }
        },
        style: {
            plot: {
                xAxis: { label: { fontSize: '1em' } }
            }
        }
    },
    { duration: 0.4 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, 
                x: { set: ['code'] }
            },
            label: { set: ['code'] }
        }
    },
    { duration: 0.4 }
    ));
}
