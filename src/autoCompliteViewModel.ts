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
		this._debounceTimeout = null;
		makeObservable(this);
	}

	//#endregion

	//#region fields

	@observable
	private _text: string;

	@observable
	private _error: string;

	private _maxSuggestions: number;

	private _debounceTimeout: NodeJS.Timeout | null;

	//#endregion

	//#region props

	readonly selectedSuggestions: ISuggestion[];

	readonly suggestions: ISuggestion[];

	get text(): string {
		return this._text;
	}
	set text(value: string) {
		if (this._debounceTimeout !== null) {
			clearTimeout(this._debounceTimeout);
		}
		this._debounceTimeout = setTimeout(() => {
			this.updateSuggestions(value);
		}, 200);
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
		runInAction(() => {
			this.selectedSuggestions.push(suggestion);
		})
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