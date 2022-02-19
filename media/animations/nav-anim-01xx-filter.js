function nav_anim_01xx_filter(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel - 1);
    let nextDir = 'dir' + dirLevel;

    return chart.animate({
        config: {
            channels: {
                y: { set: ['$count', nextDir], range: {min: '0%', max: '100%' } },
                x: { set: [crDir] },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
//                paddingLeft: '8em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                    xAxis: { label: { angle: -0.7, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 2 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: [crDir, nextDir] }
            }
        },
        style: {
            plot: {
//                paddingLeft: '8em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                    xAxis: { label: { angle: -0.7, fontSize:  '0.9em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 2 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: ['$count'], range: {min: '0%', max: '100%' } },
                x: { set: [nextDir] },
                label: { set: ['$count'] }
            }
        },
        style: {
            plot: {
                paddingLeft: '8em',                
                marker: { label: { position: 'top', fontSize: '1em'} },
                    xAxis: { label: { angle: -0.7, fontSize:  '0.8em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 2 }
    ));
}
