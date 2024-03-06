import { makeObservable, observable, runInAction } from 'mobx';
import { getCountryByName } from './api/apiService';
import { debounce } from './utils/debounce';

export interface ISuggestion {
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
		this._debounceUpdateSuggestions = debounce(this.updateSuggestions.bind(this), 200);
		makeObservable(this);
	}

	//#endregion

	//#region fields

	@observable
	private _text: string;

	@observable
	private _error: string;

	private _maxSuggestions: number;

	private _debounceUpdateSuggestions: (text: string) => void;

	//#endregion

	//#region props

	readonly selectedSuggestions: ISuggestion[];

	readonly suggestions: ISuggestion[];

	get text(): string {
		return this._text;
	}
	set text(value: string) {
		runInAction(() => this._text = value);
		this._debounceUpdateSuggestions(value);
	}

	get error(): string {
		return this._error;
	}
	set error(value: string) {
		runInAction(() => this._error = value);
	}

	//#endregion

	//#region public methods

	public async addSelectedSuggestion(suggestion: ISuggestion) {
		runInAction(() => {
			this.selectedSuggestions.push(suggestion);
		});
	}

	public removeSelectedSuggestion(suggestion: ISuggestion) {
		let values = this.selectedSuggestions.filter(e => e.name !== suggestion.name);
		runInAction(() => {
			this.selectedSuggestions.length = 0;
			this.selectedSuggestions.push(...values);
		});
	}

	//#endregion

	//#region private methods

	private async updateSuggestions(text: string) {
		try {
			const data = await getCountryByName(text);
			const newData = data.slice(0, this._maxSuggestions)
				.filter((suggestion) => !this.selectedSuggestions.find((selected) => selected.name === suggestion.name));
			runInAction(() => {
				this.suggestions.length = 0;
				this.suggestions.push(...newData);
			});
		} catch (e) {
			this.error = JSON.stringify(e);
		}
	}

	//#endregion
}