function nav_anim_10xx_filter_up(chart, dirLevel) {

    let crDir = 'dir' + (dirLevel + 1);
    let prevDir = 'dir' + dirLevel;

    vscode.postMessage({ command: 'showinfo', text: crDir });

    return chart.animate({
        config: {
            channels: {
                y: { set: [crDir], range: {min: '0%', max: '100%' } },
                x: { set: ['code', prevDir] },
                color: { set: null },
                label: { set: null }
            },
            title: null,
            legend: null
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'center', fontSize: '1.3em'} },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    )

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir, crDir], range: {min: '0%', max: '100%' } },
                x: { set: ['code', crDir] }
            }
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'center', fontSize: '1.3em'} },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ))

    .then(chart => chart.animate({
        config: {
            channels: {
                y: { set: [prevDir], range: {min: '0%', max: '100%' } },
                x: { set: ['code', crDir] }
            }
        },
        style: {
            plot: {
                paddingLeft: '13em',                
                marker: { label: { position: 'center', fontSize: '1.3em'} },
                    xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
            }
        }},
        { duration: 1 }
    ));
}
