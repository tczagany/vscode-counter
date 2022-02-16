
let chart = undefined;
let bkgndClolor = "#FF0000";
let vscode = undefined;

let state_l = false;
let state_f = false;
let restore_f = false;
let state_lc = false;
let state_fc = false;

let last_state_l = false;
let last_state_f = false;
let last_state_lc = true;
let last_state_fc = false;

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
    if (state_fc && !last_state_fc) {
        vscode.postMessage({ command: 'showinfo', text: 'Off'});
        restore_f = state_f;
        state_f = false;
        const cb_files = /** @type {HTMLElement} */ (document.getElementById('chkbox_files'));
        cb_files.checked = false;
        cb_files.disabled = true;
    }
    if (!state_fc && last_state_fc) {
        vscode.postMessage({ command: 'showinfo', text: 'On'});
        const cb_files = /** @type {HTMLElement} */ (document.getElementById('chkbox_files'));
        cb_files.disabled = false;
        if (restore_f) {
            cb_files.checked = true;
            state_f = true;
        }
        restore_f = false;
    }
    let state = "";
    let lastState = "";
    state += state_lc ? '1' : '0';
    state += state_fc ? '1' : '0';
    state += state_l ? '1' : '0';
    state += state_f ? '1' : '0';
    lastState += last_state_lc ? '1' : '0';
    lastState += last_state_fc ? '1' : '0';
    lastState += last_state_l ? '1' : '0';
    lastState += last_state_f ? '1' : '0';
    let functionName = 'anim_' + lastState + '_' + state + '();';
    eval(functionName);
    last_state_l = state_l;    
    last_state_f = state_f;
    last_state_lc = state_lc;
    last_state_fc = state_fc;
}
