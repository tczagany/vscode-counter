function anim_0100_1000() {

    chart.animate({
        config: {
            channels: {
                y: { set: null, range: {min: '0%', max: '100%' } },
            x: { set: ['code' ], range: { min: '0%', max: '100%' } },
            color: { set: null },
            label: { set: ['code' ] },
        },
        title: null, //1 code 1
        },
        style: {
            fontSize: '13',
            logo:{filter: 'lightness(-0.2)' },
        legend:{paddingLeft:'5.789473684'},
        plot: {
            paddingLeft: '13em',
            marker: { label: { position: 'center', fontSize:'1.3em'} },
            yAxis: { label: { fontSize: '1em', paddingRight: '1.3em'} },
            xAxis: { label: { angle: 0, fontSize:  '1em' },
                             title: { paddingTop: '2.5em' } }
        }
        }},
        { duration: 1 }
    );

}
