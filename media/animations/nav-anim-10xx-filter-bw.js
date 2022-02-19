function nav_anim_10xx_filter_bw(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel + 1);
    let prevDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir] }, x: { set: ['code', prevDir] },
                label: { set: null }
            }
        }},
        { duration: 1 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir, crDir] }, x: { set: ['code', crDir] }
            }
        }
    },
    { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, x: { set: ['code', crDir] }
            }
        }
    },
    { duration: 0.5 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir] }, x: { set: ['code'] }
            },
            label: { set: ['code'] }
        }
    },
    { duration: 0.5 }
    ));
}
