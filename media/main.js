
let chart = {};

(function () {
    const vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'alert', text: 'Js script started' });

    const display = /** @type {HTMLElement} */ (document.getElementById('myVizzu'));
    let promise = import('./vizzu/vizzu.js');
    promise.then( (Vizzu) => {
        try {
            chart = new Vizzu.default(display.id);
            vscode.postMessage({ command: 'showinfo', text: 'data request' });
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
                vscode.postMessage({ command: 'showinfo', text: 'data received' });
                try {
                    chart.animate({
                        data: message.data,
                        config: {
                            channels: { y: 'code', x: 'file' }
                        }
                    });
                }
                catch(e) {
                    vscode.postMessage({ command: 'showinfo', text: 'anim error' });    
                }
                break;
        }
    });
}());
