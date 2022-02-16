let chart = undefined;
let bkgndClolor = "#FF0000";
let vscode = undefined;

let state_l = false;
let state_f = false;
let restore_f = false;
let disable_f = false;
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
            vscode.postMessage({ command: 'datarequest' });
        }
        catch (e) {
            vscode.postMessage({ command: 'showerror', text: 'Load error: ' + e });
        }
    });

    window.addEventListener('message', event => {
        const message = event.data;
        switch (message.command) {
            case 'infoready':
                updateLabelContent(message.data);
                break;
            case 'dataready':
                try {
                    disableControls(true);
                    chart.initializing
                    .then(chart => chart.animate({data: message.data}))
                    .then(() => eval("anim_init().then(() => disableControls(false));"));
                }
                catch(e) {
                    vscode.postMessage({ command: 'showerror', text: 'anim error' });
                }
                vscode.postMessage({ command: 'inforequest' });
                break;
        }
    });
}());

function updateLabelContent(info) {
    const date_label = /** @type {HTMLElement} */ (document.getElementById('label_date'));
    date_label.textContent = info.date;
    const dir_label = /** @type {HTMLElement} */ (document.getElementById('label_dir'));
    dir_label.textContent = info.rootDir;
    const summ_label = /** @type {HTMLElement} */ (document.getElementById('label_summary'));
    let str = info.files.toString() + ' files, ';
    str += (info.codeCount + info.blankCount + info.commentCount).toString() + ' lines';
    summ_label.textContent = str;
    const detail_label = /** @type {HTMLElement} */ (document.getElementById('label_detail'));
    str = info.codeCount.toString() + ' code line, ';
    str += info.blankCount.toString() + ' blank line, ';
    str += info.commentCount.toString() + ' comment line';
    detail_label.textContent = str;
}

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

function disableControls(disable) {
    document.getElementById('radio_file').disabled = disable;
    document.getElementById('radio_line').disabled = disable;
    document.getElementById('chkbox_languages').disabled = disable;
    if (disable_f)
        document.getElementById('chkbox_files').disabled = true;
    else
        document.getElementById('chkbox_files').disabled = disable;
}

function animationDone() {
    disableControls(false);
}

function onBtnClick() {
    updateCtrlState();
    const cb_files = /** @type {HTMLElement} */ (document.getElementById('chkbox_files'));
    if (state_fc && !last_state_fc) {
        restore_f = state_f;
        state_f = false;
        cb_files.checked = false;
        cb_files.disabled = true;
        disable_f = true;
    }
    if (!state_fc && last_state_fc) {
        cb_files.disabled = false;
        disable_f = false;
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
    let code = 'anim_' + lastState + '_' + state + '().then(() => animationDone());';
    disableControls(true);
    eval(code);
    last_state_l = state_l;
    last_state_f = state_f;
    last_state_lc = state_lc;
    last_state_fc = state_fc;
}
