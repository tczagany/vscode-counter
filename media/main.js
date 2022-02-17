let vscode = undefined;
let navChart = undefined;
let infoChart = undefined;
let dirFilter = [];

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

    let promise = import('./vizzu/vizzu.js');
    promise.then( (Vizzu) => {
        try {
            navChart = new Vizzu.default('navVizzu');
            infoChart = new Vizzu.default('infoVizzu');
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
                addPathFilterButtons(message.data);
                break;
            case 'dataready':
                try {
                    disableControls(true);
                    infoChart.initializing
                    .then(infoChart => infoChart.animate({data: message.data}))
                    .then(() => eval("anim_init(infoChart).then(() => disableControls(false));"));
                    navChart.initializing
                    .then(navChart => navChart.animate({data: message.data}))
                    .then(() => eval("nav_anim_init(navChart).then(() => disableControls(false));"))
                    .then(() => navChart.on('click', navChartClick));
                }
                catch(e) {
                    vscode.postMessage({ command: 'showerror', text: 'anim error ' + e.toString() });
                }
                vscode.postMessage({ command: 'inforequest' });
                break;
        }
    });
}());

function navChartClick(event) {
    if (event.data.marker != undefined) {
        let level = dirFilter.length;
        let levelStr = 'dir' + level.toString();
        let filterStr = event.data.marker.categories[levelStr];
        dirFilter.push(filterStr);
        applyFilter();
    }
}

function applyFilter() {
    infoChart.animate({
		data: {
			filter: (record) => {
                for(let i = 0; i < dirFilter.length; i++) {
                    let name = 'dir' + i;
                    let value = dirFilter[i];
                    if (record[name] != value)
                        return false;
                }
				return true;
            }
		}
	});
    navChart.animate({
		data: {
			filter: (record) => {
                for(let i = 0; i < dirFilter.length; i++) {
                    let name = 'dir' + i;
                    let value = dirFilter[i];
                    if (record[name] != value)
                        return false;
                }
				return true;
            }
		}
	}).then(() => {
        updateCtrlState();
        if (state_lc) {
            let level = dirFilter.length;
            let code = 'nav_anim_10xx_filter(navChart, level).then(() => disableControls(false));';
            eval(code);
        }
        else {
            let level = dirFilter.length;
            let code = 'nav_anim_01xx_filter(navChart, level).then(() => disableControls(false));';
            eval(code);
        }        
    });
}

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

function onBtnClick() {
    updateCtrlState();
    const cb_files = /** @type {HTMLElement} */ (document.getElementById('chkbox_files'));
    let navAnimRequest = 0;
    if (state_fc && !last_state_fc) {
        navAnimRequest = 1;
        restore_f = state_f;
        state_f = false;
        cb_files.checked = false;
        cb_files.disabled = true;
        disable_f = true;
    }
    if (!state_fc && last_state_fc) {
        navAnimRequest = 2;
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
    let code = 'anim_' + lastState + '_' + state + '(infoChart).then(() => disableControls(false));';
    disableControls(true);
    eval(code);
    if (navAnimRequest == 2) {
        let level = dirFilter.length;
        let code = 'nav_anim_01xx_10xx(navChart, level).then(() => disableControls(false));';
        eval(code);
    }
    if (navAnimRequest == 1) {
        let level = dirFilter.length;
        let code = 'nav_anim_10xx_01xx(navChart, level).then(() => disableControls(false));';
        eval(code);
    }
    last_state_l = state_l;
    last_state_f = state_f;
    last_state_lc = state_lc;
    last_state_fc = state_fc;
}
