
function nav_anim_init(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: ['dir0'], range: { min: '0%', max: '100%' } },
                x: { set: ['code'], range: { min: '0%', max: '110%' } },
                color: { set: null },
                label: { set: ['code'] },
            },
            title: null,
            legend: null
        },
        style: {
            fontSize:'1.1em',
            backgroundColor: '#00000000',
            logo: { filter: 'opacity(0)' },
            plot: {
                paddingLeft: '6em',
                paddingRight: '2em',
                yAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { paddingRight: '1.2em' }
                },
                xAxis: {
                    color: 'rgba(130,130,130,0.2)',
                    interlacing: { color: 'rgba(126,126,126,0.08)' },
                    label: { paddingTop: '0.9em', angle: 0 }, title: { paddingTop: '2.2em' }
                }
            }
        }
    },
        {
            duration: 0.2
        })

        .then(chart => {
            chart.feature('tooltip', true);
            return chart;
        })

        ;
}