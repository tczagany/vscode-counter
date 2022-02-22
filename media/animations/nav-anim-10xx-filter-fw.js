function nav_anim_10xx_filter_fw(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel - 1);
    let nextDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: { min: '0%', max: '100%' } },
                x: { set: ['code', nextDir] },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right' } },
                xAxis: { label: { angle: 0 } }
            }
        }
    },
        { duration: 0.4 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir], range: { min: '0%', max: '100%' } },
                    x: { set: ['code'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.4 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [nextDir], range: { min: '0%', max: '100%' } },
                    x: { set: ['code'] },
                    label: { set: ['code'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'right' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 0.4 }
        ));
}
