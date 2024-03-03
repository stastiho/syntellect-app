import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Control from './Control';
import AutoCompleteControl from './AutoCompleteControl';
import { ControlStore } from './ControlStore';

const store = new ControlStore();

const App: React.FC = observer(() => {
	useEffect(() => {
		store.initialization()
	})

	return (
		<div>
			<h1>Button Control Tests</h1>
			<Control viewModel={store.controlViewModel1} />
			<Control viewModel={store.controlViewModel2} />

			<h1>Auto Complete Control Tests</h1>
			<AutoCompleteControl viewModel={store.autoCompleteViewModel1} />
			<AutoCompleteControl viewModel={store.autoCompleteViewModel2} />
		</div>
	);
});

export default App;
