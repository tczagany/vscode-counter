
let chart = {};
let bkgndClolor = "#FF0000";

(function () {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'alert', text: 'Js script started' });

    const display = /** @type {HTMLElement} */ (document.getElementById('myVizzu'));
    //bkgndClolor = display.style.backgroundColor;
    let promise = import('./vizzu/vizzu.js');
    promise.then( (Vizzu) => {
        try {
            chart = new Vizzu.default(display.id);
            vscode.postMessage({ command: 'datarequest', text: '' });
        }
        catch (e) {
            vscode.postMessage({ command: 'showerror', text: 'Load error: ' + e });
        }
    });

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'dataready':
                try {
                    chart.initializing
                    .then(chart => chart.animate({
                        data: message.data,
                        config: {
                            channels: { y: 'code', x: 'file' }
                        },
                        style: {
                        }
                    }));
                }
                catch(e) {
                    vscode.postMessage({ command: 'showinfo', text: 'anim error' });    
                }
                break;
        }
    });
}());
