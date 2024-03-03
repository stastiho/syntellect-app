import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoCompleteViewModel } from './autoCompliteViewModel';

interface AutoCompleteControlProps {
	viewModel: AutoCompleteViewModel;
}

const AutoCompleteControl: React.FC<AutoCompleteControlProps> = observer(({ viewModel }) => {
	return (
		//TODO: переделать инпут для показа выбранного текста с возможность добавлять еще данные и удалять выбранный элемент
		<div>
			<div>
				{viewModel.selectedSuggestions.map((suggestion, index) => (
					<li key={index} onClick={() => viewModel.text = suggestion.name}>
						{suggestion.name}
					</li>
				))}
				<input type="text" value={viewModel.text} onChange={(e) => viewModel.text = e.target.value} />
			</div>
			<ul>
				{viewModel.suggestions.map((suggestion, index) => (
					<li key={index} onClick={() => {
						viewModel.setSelectedSuggestions(suggestion);
						viewModel.text = "";
					}}>
						{suggestion.name} - {suggestion.fullName} - {suggestion.flag}
					</li>
				))}
			</ul>
		</div>
	);
});

export default AutoCompleteControl;
