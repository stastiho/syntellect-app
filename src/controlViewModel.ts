import { makeObservable, observable, runInAction } from 'mobx';

export interface IButton {
	text: string;
	onClick: () => void
}

export class ControlViewModel {
	//#region ctor

	constructor(text: string) {
		this._text = text;
		this.leftButtons = observable.array([], { deep: false });
		this.rightButtons = observable.array([], { deep: false });
		makeObservable(this);
	}

	//#endregion

	//#region fields

	@observable
	private _text: string;

	//#endregion

	//#region props

	readonly leftButtons: IButton[];

	readonly rightButtons: IButton[];

	get text(): string {
		return this._text;
	}
	set text(value: string) {
		runInAction(() => this._text = value);
	}

	//#endregion

	//#region public methods

	initialization(leftButtons: IButton[], rightButtons: IButton[]) {
		runInAction(() => {
			this.leftButtons.length = 0;
			this.leftButtons.push(...leftButtons);
			this.rightButtons.length = 0;
			this.rightButtons.push(...rightButtons);
		})
	}

	//#endregion
}