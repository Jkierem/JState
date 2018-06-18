import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WareHouse , { Reducer , combineReducers } from '../juanstate'

let flowers=(state={},action)=>{
	const { flower , count=undefined } = action
	switch (action.type) {
		case "ADD_FLOWER":
			return {
				...state,
				[flower] : state[flower] === undefined ? count : state[flower] + count
			}
		case "DELETE_FLOWER":
			let new_state = Object.assign({},state)
			delete new_state[flower]
			return new_state
		default:
			return state
	}
}

let pots = (state={},action) =>{
	const { type=undefined , color=undefined , count=0 } = action
	switch (type) {
		case "NEW_POT":
			return {
				...state,
				[color] : count
			}
		case "ADD_POT":
			if( state[color] ){
				return {
					...state,
					[color] : state[color] + count
				}
			}else{
				console.error("Trying to add undefined pots");
				return state
			}
		default:
			return state;
	}
}

/*combineReducers function creates single reducer from various reducers.
Has built in checking so that invalid arguments are ignored*/
//let reducer = combineReducers(flowers,pots,undefined,1,"2",{one:1,two:2,nest:{nested:true}},()=>({ valid: "nope"}));

/*Use combineReducers static method of Reducer class in case you want debugging*/
//Reducer.enableDebug()
let reducer = Reducer.combineReducers(flowers,pots,undefined,1,"2",{one:1,two:2,nest:{nested:true}},()=>({ valid: "nope"}))
/**/

ReactDOM.render(
	<WareHouse reducer={reducer}>
		<App/>
	</WareHouse>,
	document.getElementById('root')
);
