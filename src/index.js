import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WareHouse , { combineReducers } from './jstate'

let flowers=(state={},action)=>{
	switch (action.type) {
		case "ADD_FLOWER":
			return {
				...state,
				[action.flower] : action.count
			}
		default:
			return state
	}
}

let pots = (state={},action) =>{
	switch (action.type) {
		case "NEW_POT":
			return {
				...state,
				[action.color] : action.count
			}
		case "ADD_POT":
			return {
				...state,
				[action.color] : state[action.color] + action.count
			}
		default:
			return state;
	}
}

let reducer = combineReducers(flowers,pots,undefined,1,"2",{one:1,two:2,nest:{nested:true}});

ReactDOM.render(
	<WareHouse reducer={reducer}>
		<App/>
	</WareHouse>,
	document.getElementById('root')
);
