
let chart = undefined;
let bkgndClolor = "#FF0000";
let vscode = undefined;

let state_l = false;
let state_f = false;
let state_lc = false;
let state_fc = false;

let lastState = "1000";

(function () {
    vscode = acquireVsCodeApi();
    vscode.postMessage({ command: 'alert', text: 'Js script started' });

    const display = /** @type {HTMLElement} */ (document.getElementById('myVizzu'));
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
                    .then(chart => chart.animate({data: message.data }))
                    .then(() => eval("anim_init();"));
                }
                catch(e) {
                    vscode.postMessage({ command: 'showerror', text: 'anim error' });
                }
                vscode.postMessage({ command: 'showinfo', text: 'Ready'});
                break;
        }
    });
}());

function updateCtrlState() {
    const rb_linecount = /** @type {HTMLElement} */ (document.getElementById('radio_line'));
    state_lc = rb_linecount.checked;
    const rb_filecount = /** @type {HTMLElement} */ (document.getElementById('radio_file'));
    state_fc = rb_filecount.checked;
    const cb_files = /** @type {HTMLElement} */ (document.getElementById('chkbox_files'));
    state_f = cb_files.checked;
    const cb_languages = /** @type {HTMLElement} */ (document.getElementById('chkbox_languages'));
    state_l = cb_languages.checked;
}

function onBtnClick() {
    updateCtrlState();
    let str = "";
    str += state_lc ? '1' : '0';
    str += state_fc ? '1' : '0';
    str += state_l ? '1' : '0';
    str += state_f ? '1' : '0';
    let functionName = 'anim_' + lastState + '_' + str + '();';
    lastState = str;
    eval(functionName);
}
