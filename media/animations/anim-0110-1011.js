function anim_0110_1011(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: { min: '0%', max: '110%' } },
                x: { set: ['type'] },
                color: { set: ['type'] },
                label: { set: ['$count'] },
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
        { duration: 0.5 }
    )

        .then(chart => chart.animate({
            config: {
                channels: {
                    y: { set: ['$count', 'file'], range: { min: '0%', max: '110%' } },
                    x: { set: ['type'] },
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
                    y: { set: ['type', 'file'], range: { min: '0%', max: '100%' } },
                    x: { set: ['code'] },
                    color: { set: ['type'] }
                },
                title: null, //  '6 code + types + Files 1',
                legend: 'color',
                sort: 'none',
                reverse: true,
            },
            style: {
                plot: {
                    paddingLeft: '0em',
                    yAxis: { label: { fontSize: '0em' } },
                    xAxis: { label: { angle: 0 } }
                }
            }
        },
            { duration: 2 }
        ));
}
