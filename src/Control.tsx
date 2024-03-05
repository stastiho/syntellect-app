import React from 'react';
import { observer } from 'mobx-react-lite';
import { ControlViewModel } from './controlViewModel';
import './Control.css'; // Импортируем CSS

interface ControlProps {
	viewModel: ControlViewModel;
}

const Control: React.FC<ControlProps> = observer(({ viewModel }) => {
	return (
		<div className="control-container">
			<div className="control-buttons control-buttons--left">
				{viewModel.leftButtons.map((button, index) => (
					<button key={index} onClick={button.onClick}>
						{button.text}
					</button>
				))}
			</div>
			<p className="control-text">
				{viewModel.text}
			</p>
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