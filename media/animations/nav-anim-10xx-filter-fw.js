function nav_anim_10xx_filter_fw(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel - 1);
    let nextDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir], range: { min: '0%', max: '100%' } },
                x: { set: ['code', nextDir] },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                marker: { label: { position: 'right'/*, fontSize: '1em'*/ } },
                xAxis: { label: { angle: 0/*, fontSize:  '1em'*/ } }
            }
        }
    },
        { duration: 0.5 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: [crDir, nextDir], range: { min: '0%', max: '100%' } },
                    x: { set: ['code'] }
                }
            },
            style: {
                plot: {
                    marker: { label: { position: 'right'/*, fontSize: '1em'*/ } },
                    xAxis: { label: { angle: 0/*, fontSize:  '1em'*/ } }
                }
            }
        },
            { duration: 1 }
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
                    marker: { label: { position: 'right'/*, fontSize: '1em'*/ } },
                    xAxis: { label: { angle: 0/*, fontSize:  '1em'*/ } }
                }
            }
        },
            { duration: 1 }
        ));
}
