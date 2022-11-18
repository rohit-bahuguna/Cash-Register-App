import { isCursorAtStart } from '@testing-library/user-event/dist/utils';
import { useState } from 'react';
import './App.css';

function App() {
	let [bill, setBill] = useState();
	const [cash, setCash] = useState();
	let [balance, setBalance] = useState([]);
	let [error, setError] = useState();

	const currencies = [2000, 500, 100, 20, 10, 5, 1];

	const calculateChange = () => {
		let change = cash - bill;
		if (change < 0) {
			setError('cash amount can not be less then bill amount');
		} else {
			setError('');

			const notes = currencies.map((value, index) => {
				let numNotes = '';

				if (change >= value) {
					numNotes = Math.floor(change / value);

					change = change % value;
				}
				return numNotes;
			});
			setBalance(notes);
		}
		setBill('');
		setCash('');
	};

	return (
		<div className="App">
			<h1>Cash Register Manager</h1>
			<p>
				Enter the bill amount and cash given by the customer and know minimum
				number of notes to return{' '}
			</p>
			<label>Bill Amount</label>
			<input
				value={bill}
				type="number"
				onChange={e => setBill(e.target.value)}
			/>
			<label>Cash Given</label>

			<input
				value={cash}
				type="number"
				onChange={e => {
					setCash(e.target.value);
				}}
			/>
			<div>
				{error}
			</div>

			<button onClick={calculateChange}>Check</button>
			<table>
				<tr>
					<th>No of Notes</th>
					{balance &&
						balance.map(value => {
							return (
								<td>
									{' '}{value}
								</td>
							);
						})}
				</tr>
				<tr>
					<th>Notes of Currencies </th>

					<td>2000</td>
					<td>500</td>
					<td>100</td>
					<td>20</td>
					<td>10</td>

					<td>5</td>
					<td>1</td>
				</tr>
			</table>
		</div>
	);
}

export default App;
