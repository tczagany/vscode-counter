function nav_anim_01xx_filter_bw(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel + 1);
    let prevDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: [crDir] },
                label: { set: null }
            },
            legend: null
        }},
        { duration: 0.4 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count', crDir ] }, 
                x: { set: null }
            }
        }
    },
    { duration: 0.4 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'] }, 
                x: { set: prevDir }
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
                y: { set: ['$count'] }, 
                x: { set: [prevDir] }
            },
            label: { set: ['$count'] }
        }
    },
    { duration: 0.4 }
    ));
}
