//Utilities
import { objectToString } from '../Utils'

//Store singleton
let instance = undefined;

export const getStore = () => ( instance );

export const getState = () => ( instance.getState !== undefined? instance.getState() : null );

export const dispatch = (action) => { if(instance) instance.dispatch(action) };

export default class Store{
	constructor(reducers={},state={}){
		if(!instance){
			this.reducers = reducers;
			this.state = state;
			for (let red in reducers) {
				if (reducers.hasOwnProperty(red)) {
					this.state[red] = {}
				}
			}
			instance = this;
			this.dispatch({ type : "firstAction" })
		}
	}

	dispatch = (action) =>{
		let { reducers } = instance;
		for (let red in reducers) {
			if (reducers.hasOwnProperty(red)) {
				instance.state[red] = this.reducers[red](this.state[red] , action);
			}
		}
	}

	getState = () =>{
		return instance.state;
	}
}

//Combine reducers helper
export const combineReducers = (...args) => {
	const combination = {};
	for (let i = 0; i < args.length; i++) {
		if( typeof(args[i]) === "function" ){
			combination[args[i].name] = args[i];
		}else{
			let type = typeof(args[i]);
			let value = args[i];
			if( type === "object"){
				value = objectToString(args[i])
			}
			console.error(`Argument number ${i+1} in function combineReducers is not a function thus it will not be combined. Its type is ${type}. value: ${value}`);
		}
	}
	return combination;
}
