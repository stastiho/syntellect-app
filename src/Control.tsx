import React from 'react';
import { observer } from 'mobx-react-lite';
import { ControlViewModel } from './controlViewModel';
import './Control.css';

interface ControlProps {
	viewModel: ControlViewModel;
}

const Control: React.FC<ControlProps> = observer(({ viewModel }) => {
	const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		viewModel.text = event.target.value;
	};

	return (
		<div className="control-container">
			<div className="control-buttons control-buttons--left">
				{viewModel.leftButtons.map((button, index) => (
					<button key={index} onClick={button.onClick}>
						{button.text}
					</button>
				))}
			</div>
			<input
				type="text"
				value={viewModel.text}
				onChange={handleTextChange}
				className="control-text-input"
			/>
			<div className="control-buttons control-buttons--right">
				{viewModel.rightButtons.map((button, index) => (
					<button key={index} onClick={button.onClick}>
						{button.text}
					</button>
				))}
			</div>
		</div>
	);
});

export default Control;