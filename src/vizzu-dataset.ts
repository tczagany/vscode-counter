import Result from './result';

export default class VizzuDataFormatter {
	private _vizzuDataTable: any = {};
	private _pathFragments: Array<Array<String>> = [];

	public constructor() {
		this._vizzuDataTable = { series: [], records: [] };
	}

	makeDataTable(codeCounterData: Result[]) {
		this.preparePathFragments(codeCounterData);
		this.removeRedundantPathFragments();
		let depth = this.getDirStructureDepth();
		this.generatePathSequences(depth);
		this.generateTableStructure(depth);
		this.generateRecords(codeCounterData);
	}

	generateRecords(codeCounterData: Result[]) {
		for(let i = 0; i < codeCounterData.length; i++) {
			let vizzuRecord = new Array<String>();
			let ccRecord = codeCounterData[i];
			let file = new String(ccRecord.uri.toString().split('/').pop());
			vizzuRecord.push(new String(file));
			vizzuRecord.push(new String(ccRecord.language));
			vizzuRecord.push(new String(ccRecord.code.toString()));
			vizzuRecord.push(new String(ccRecord.comment.toString()));
			vizzuRecord.push(new String(ccRecord.blank.toString()));
			let frags = this._pathFragments[i];
			let depth = frags.length;
			for(let j = 0; j < depth; j++)
				vizzuRecord.push(frags[j]);
			vizzuRecord[0] = new String(frags[depth - 1].valueOf() + vizzuRecord[0]);
			this._vizzuDataTable.records.push(vizzuRecord);
		}
	}

	generateTableStructure(depth: number) {
		this._vizzuDataTable.series.push({ name: 'file', type: 'dimension' });
		this._vizzuDataTable.series.push({ name: 'type', type: 'dimension' });
		this._vizzuDataTable.series.push({ name: 'code', type: 'measure' });
		this._vizzuDataTable.series.push({ name: 'blank', type: 'measure' });
		this._vizzuDataTable.series.push({ name: 'comment', type: 'measure' });
		for(let i = 0; i < depth; i++) {
			this._vizzuDataTable.series.push({ name: 'dir' + i, type: 'dimension' });
		}
	}

	preparePathFragments(codeCounterData: Result[]) {
		this._pathFragments = [];
		codeCounterData.forEach(
			({ uri }) => {
				let path = uri.toString();
				let frags = path.split('/');
				let storage = new Array();
				frags.pop();
				frags.splice(0, 3);
				frags.forEach((str) => storage.push(new String(str)));
				this._pathFragments.push(storage);
			}
		);
	}

	removeRedundantPathFragments() {
		let ref = this._pathFragments[0];
		for(let same = true; same;) {
			this._pathFragments.forEach(
				(comp) => {
					if (comp[0] == undefined)
						same = false;
					if (same && ref[0].valueOf() != comp[0].valueOf())
						same = false;
				}
			);
			if (same)
			this._pathFragments.forEach(
					(item) => item.splice(0, 1)
				);
		}
	}

	getDirStructureDepth() {
		let depth = 0;
		this._pathFragments.forEach(
			(frags) => {
				if (frags.length > depth)
					depth = frags.length;
			}
		);
		return depth;
	}

	generatePathSequences(depth: number) {
		for(let i = 0; i < this._pathFragments.length; i++) {
			let prefix = '';
			let currentDepth = 0;
			var frags = this._pathFragments[i];
			for(let j = 0; j < frags.length; j++) {
				currentDepth++;
				let temp = frags[j];
				frags[j] = new String(prefix + frags[j] + '/');
				if (prefix.length != 0)
					prefix = prefix + temp + '/';
				else
					prefix = temp.valueOf() + '/';
			}
			for(let i = depth - currentDepth; i > 0; i--)
				frags.push(new String(prefix));
		}
	}

	getDataTable() {
		return this._vizzuDataTable;
	}
}