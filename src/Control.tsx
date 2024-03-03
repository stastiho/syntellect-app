import React from 'react';
import { observer } from 'mobx-react-lite';
import { ControlViewModel } from './controlViewModel';

interface ControlProps {
	viewModel: ControlViewModel;
}

const Control: React.FC<ControlProps> = observer(({ viewModel }) => {

	return (
		<div style={{ display: "flex", flexDirection: "row" }}>
			{viewModel.leftButtons.map((button, index) => (
				<button key={index} onClick={button.onClick}>
					{button.text}
				</button>
			))}
			<p>
				{viewModel.text}
			</p>
			{viewModel.rigthButtons.map((button, index) => (
				<button key={index} onClick={button.onClick}>
					{button.text}
				</button>
			))}
		</div>
	);
});

export default Control;
