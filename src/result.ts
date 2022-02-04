'use strict';
import * as vscode from 'vscode';
import { Count } from './LineCounter';

export default class Result extends Count {
    public uri: vscode.Uri;
    public filename: string;
    public language: string;

    constructor(uri: vscode.Uri, language: string, count = { code: 0, comment: 0, blank: 0 }) {
        super(count.code, count.comment, count.blank);
        this.uri = uri;
        this.filename = uri.fsPath;
        this.language = language;
    }
    clone() {
        return new Result(this.uri, this.language, this);
    }
}
