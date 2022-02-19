function anim_0110_0100(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: { min: '0%', max: '110%' } },
                x: { set: ['type'] },
                label: { set: ['$count'] },
                color: { set: ['type'] }
            },
            title: null, //  '10 File count + types 2',
            sort: 'byValue',
            legend: null,
            reverse: true,
        },
        style: {
            plot: {
                paddingLeft: '9em',
                marker: { label: { position: 'top' } },
                xAxis: { label: { angle: -0.7 } }
            }
        }
    },
        { duration: 0.1 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'file'], range: { min: '0%', max: '110%' } },
                    x: { set: ['type'] },
                    color: { set: ['type'] },
                    label: { set: null },
                },
                title: null, //  '11 File count + type 3',
                sort: 'byValue',
                legend: null,
                reverse: true,
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'top' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.5 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'type', 'file'], range: { min: '0%', max: '100%' } },
                    x: { set: null },
                    label: { set: null },
                    color: { set: ['type'] }
                },
                title: null, //  '12 File count 1',
                legend: null
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 2 }
        ))

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count'], range: { min: '0%', max: '100%' } },
                    x: { set: null },
                    color: { set: null },
                    label: { set: ['$count'] },
                },
                title: null, //  '13 File count 2',
                legend: null
            },
            style: {
                plot: {
                    paddingLeft: '9em',
                    marker: { label: { position: 'center' } },
                    xAxis: { label: { angle: -0.7 } }
                }
            }
        },
            { duration: 0.5 }
        ));
}
