import React, { useEffect } from 'react';
import Control from './Control';
import AutoCompleteControl from './AutoCompleteControl';
import { ControlStore } from './ControlStore';
import './App.css';

const store = new ControlStore();

const App: React.FC = () => {
	useEffect(() => {
		store.initialization();
	});

	return (
		<div className="container">
			<div className="content">
				<h1>Button Control Tests</h1>
				<Control viewModel={store.controlViewModel1} />
				<Control viewModel={store.controlViewModel2} />

				<h1>Auto Complete Control Tests</h1>
				<div className="auto-complete-control">
					<div className="auto-complete-control-item">
						<AutoCompleteControl viewModel={store.autoCompleteViewModel1} />
					</div>
					<div className="auto-complete-control-item">
						<AutoCompleteControl viewModel={store.autoCompleteViewModel2} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
