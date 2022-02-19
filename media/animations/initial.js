
function anim_init(chart) {

    return chart.animate({
        config: {
            channels: {
                y: { set: null, range: { min: '0%', max: '100%' } },
                x: { set: ['code'], range: { min: '0%', max: '100%' } },
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
            legend: { width: '9em', marker: { size: '11' }, paddingLeft: '0', paddingRight: '0' },
            plot: {
                paddingLeft: '12em',
                marker: { label: { position: 'center' } },
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
            duration: 1
        })

        .then(chart => {
            chart.feature('tooltip', true);
            return chart;
        })

        ;
}