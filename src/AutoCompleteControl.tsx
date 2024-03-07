import React from 'react';
import { observer } from 'mobx-react-lite';
import { AutoCompleteViewModel, ISuggestion } from './autoCompliteViewModel';
import './AutoCompleteControl.css';

interface AutoCompleteControlProps {
  viewModel: AutoCompleteViewModel;
}

const AutoCompleteControl: React.FC<AutoCompleteControlProps> = observer(({ viewModel }) => {
  const handleSuggestionClick = (suggestion: ISuggestion) => {
    if (!viewModel.selectedSuggestions.find((selected) => selected.name === suggestion.name)) {
      viewModel.text = '';
      viewModel.addSelectedSuggestion(suggestion);
    }
  };

  const handleRemoveSelectedSuggestion = (suggestion: ISuggestion) => {
    viewModel.removeSelectedSuggestion(suggestion);
  };

  return (
    <div className="auto-complete-container">
      <div className="auto-complete-input-container">
        {viewModel.selectedSuggestions.map((suggestion) => (
          <div key={suggestion.name} className="selected-suggestion">
            {suggestion.name} <button onClick={() => handleRemoveSelectedSuggestion(suggestion)}><p>x</p></button>
          </div>
        ))}
        <input
          type="text"
          value={viewModel.text}
          placeholder="Enter the country in RU"
          onChange={e => (viewModel.text = e.target.value)}
          className="auto-complete-input"
        />
      </div>
      <div className="error-container">
        {viewModel.error === "" ? null : <p className="error-message">{viewModel.error}</p>}
      </div>
      {viewModel.suggestions.length > 0 && (
        <ul className="auto-complete-suggestions">
          {viewModel.suggestions.map((suggestion) => (
            <li
              key={suggestion.name}
              onClick={() => handleSuggestionClick(suggestion)}
              className="auto-complete-suggestion"
            >
              {suggestion.name} - {suggestion.fullName} - {suggestion.flag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default AutoCompleteControl;