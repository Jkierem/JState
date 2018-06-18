//Utilities
import { objectToString , shallowObjectEquals } from '../Utils'
import React , { Component } from 'react'
//Store singleton
let instance = undefined;

export const getStore = () => ( instance );

export const hasStateChanged = () => ( instance.hasChanged )

export const getState = () => ( instance.getState !== undefined? instance.getState() : null );

export function dispatch(action){ if(instance) instance.dispatch(action) };

export function inject(injectedComponent,injection){
	return function(){
		return <Inject injection={injection}>{React.createElement(injectedComponent)}</Inject>
	}
}

export class Inject extends Component{

	injectComponent = () =>{
		return React.cloneElement(
			this.props.children ,
			{
				state: this.props.injection(getState()) ,
				dispatch: dispatch
			});
	}

	render(){
		return this.injectComponent()
	}
}

export default class Store{
	constructor(reducers,state={}){
		if(!instance){
			try{
				if( reducers!== undefined ){
					this.reducers = reducers;
					this.previousState = {}
					this.hasChanged = false
					this.state = state;
					for (let red in reducers) {
						if (reducers.hasOwnProperty(red)) {
							this.state[red] = {}
						}
					}
					instance = this;
					this.dispatch({ type : "firstAction" })
				}else{
					throw new TypeError("Reducers must not be undefined.");
				}
			}catch(e){
				console.error(e);
			}
		}
	}

	dispatch(action){
		let { reducers } = instance;
		instance.previousState = Object.assign({},instance.state)
		for (let red in reducers) {
			if (reducers.hasOwnProperty(red)) {
				instance.state[red] = this.reducers[red](this.state[red] , action);
			}
		}
		instance.hasChanged = !shallowObjectEquals(instance.state , instance.previousState)
	}

	getState = () =>{
		return instance.state;
	}
}

//Combine reducers helper
export const combineReducers = (...args) => {
	let combination = {};
	for (let i = 0; i < args.length; i++) {
		if( typeof(args[i]) === "function" ){
			if( Object.keys(args[i]({},{type: "test" })).length === 0 )
				combination[args[i].name] = args[i];
		}
	}
	if ( Object.keys(combination).length === 0 )
		combination = undefined
	return combination;
}

class Reducer{
	static enableDebug(){
		Reducer.debug = true
	}

	static disableDebug(){
		Reducer.debug = false
	}

	static combineReducers(...args){
		let combination = {};
		for (let i = 0; i < args.length; i++) {
			if( typeof(args[i]) === "function" ){
				let test = args[i]({},{type: "test" })
				if( Object.keys(test).length === 0 )
					combination[args[i].name] = args[i];
				else
				if(Reducer.debug === true)
					console.error(`Reducer function ${i+1} doesn't behave as expected given the initial action thus it will not be combined. Expected result was empty object instead received ${typeof(test)} : ${objectToString(test)}`);
			}else{
				if(Reducer.debug === true){
					let type = typeof(args[i]);
					let value = args[i];
					if( type === "object"){
						value = objectToString(args[i])
					}
					console.error(`Argument number ${i+1} in function combineReducers is not a function thus it will not be combined. Its type is ${type}. value: ${value}`);
				}
			}
		}
		if ( Object.keys(combination).length === 0 )
			combination = undefined
		return combination;
	}
}

Reducer.debug = false;
export {Reducer};
