import { AutoCompleteViewModel } from './autoCompliteViewModel';
import { ControlViewModel, IButton } from './controlViewModel';

export class ControlStore {
	//#region ctor

	constructor() {
		this._controlViewModel1 = new ControlViewModel("Control1");
		this._controlViewModel2 = new ControlViewModel("Control2");
		this._autoCompleteViewModel1 = new AutoCompleteViewModel(3);
		this._autoCompleteViewModel2 = new AutoCompleteViewModel(10);
	}

	//#endregion

	//#region fields

	private _controlViewModel1: ControlViewModel;

	private _controlViewModel2: ControlViewModel;

	private _autoCompleteViewModel1: AutoCompleteViewModel;

	private _autoCompleteViewModel2: AutoCompleteViewModel;

	//#endregion

	//#region props

	get controlViewModel1(): ControlViewModel {
		return this._controlViewModel1;
	}

	get controlViewModel2(): ControlViewModel {
		return this._controlViewModel2;
	}

	get autoCompleteViewModel1(): AutoCompleteViewModel {
		return this._autoCompleteViewModel1;
	}

	get autoCompleteViewModel2(): AutoCompleteViewModel {
		return this._autoCompleteViewModel2;
	}

	//#endregion

	//#region public methods

	initialization() {
		const rightButtons1: IButton[] = [{
			text: "Clear",
			onClick: () => {
				this.controlViewModel1.text = "";
			}
		},
		{
			text: "Set text",
			onClick: () => {
				this.controlViewModel1.text = "Hello world!";
			}
		}]
		const leftButtons2: IButton[] = [{
			text: "Show text",
			onClick: () => alert(this.controlViewModel2.text)
		}]
		const rightButtons2: IButton[] = [{
			text: "Validate number",
			onClick: () => {
				const num = Number(this.controlViewModel2.text);
				if (!isNaN(num)) {
					alert(num);
				}
			}
		}]
		this.controlViewModel1.initialization([], rightButtons1);
		this.controlViewModel2.initialization(leftButtons2, rightButtons2);
	}

	//#endregion
}
