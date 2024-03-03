import { makeObservable, observable, runInAction } from 'mobx';
import { getCountryByName } from './api/apiService';

interface ISuggestion {
	name: string;
	fullName: string;
	flag: string;
}

export class AutoCompleteViewModel {
	//#region ctor

	constructor(maxSuggestions: number) {
		this._text = "";
		this._error = "";
		this._maxSuggestions = maxSuggestions;
		this.selectedSuggestions = observable.array([], { deep: false });
		this.suggestions = observable.array([], { deep: false });
		makeObservable(this);
	}

	//#endregion

	//#region fields

	@observable
	private _text: string;

	@observable
	private _error: string;

	private _maxSuggestions: number;

	//#endregion

	//#region props

	readonly selectedSuggestions: ISuggestion[];

	readonly suggestions: ISuggestion[];

	get text(): string {
		return this._text;
	}
	set text(value: string) {
		this.updateSuggestions(value);
		runInAction(() => this._text = value);
	}

	get error(): string {
		return this._error;
	}
	set error(value: string) {
		runInAction(() => this._error = value);
	}

	//#endregion

	//#region public methods

	public async setSelectedSuggestions(suggestion: ISuggestion) {
		// TODO: удалить дубликаты из selectedSuggestions
		runInAction(() => {
			this.selectedSuggestions.push(suggestion);
		})
	}

	//#endregion

	//#region private methods

	private async updateSuggestions(text: string) {
		// TODO: debounce
		try {
			const data = await getCountryByName(text);
			const newData = data.slice(0, this._maxSuggestions)
			runInAction(() => {
				this.suggestions.length = 0;
				this.suggestions.push(...newData);
			})
		} catch (e) {
			this.error = JSON.stringify(e);
		}
	}

	//#endregion
}