import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoCompleteViewModel } from './autoCompliteViewModel';
import './AutoCompleteControl.css'; // Импортируем CSS

interface AutoCompleteControlProps {
	viewModel: AutoCompleteViewModel;
}

const AutoCompleteControl: React.FC<AutoCompleteControlProps> = observer(({ viewModel }) => {
	const handleSuggestionClick = (suggestion: any) => {
		viewModel.text = suggestion.name;
		viewModel.clearSuggestions();
		viewModel.setSelectedSuggestions(suggestion);
	};

	return (
		<div className="auto-complete-container">
			<input
				type="text"
				value={viewModel.text}
				onChange={(e) => viewModel.text = e.target.value}
				className="auto-complete-input"
			/>
			{viewModel.suggestions.length > 0 && (
				<ul className="auto-complete-suggestions">
					{viewModel.suggestions.map((suggestion, index) => (
						<li key={index} onClick={() => handleSuggestionClick(suggestion)} className="auto-complete-suggestion">
							{suggestion.name} - {suggestion.fullName} - {suggestion.flag}
						</li>
					))}
				</ul>
			)}
		</div>
	);
});

export default AutoCompleteControl;