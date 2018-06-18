# JuanState

Simple state handler to use with react. It is more of a proof of concept than actual tool.

## Usage

JuanState is a mini state handler based on Redux. It is not intended for big projects.
Sense it is based on Redux, it uses the same logic.

### WareHouse

Equivalent to a Redux Store. It handles state and receives reducers. Only one store can exist as it is a singleton.

### Reducer

A function that receives previous state and an action and returns an action. All reducers must be functions. A WareHouse can only contain one reducer. Combining reducers can be done in several ways. The easiest is using the "combineReducers" function or if you need feedback you can use the Reducer class which contains a combineReducers static function. If debugging is enabled, the static function will print on console useful information. The combineReducers function ignores invalid reducers.
Reducers should be pure or else the WareHouse may fail.

### Action

Something that changes the state. Actions must be a javascript object with a type attribute. On initializing, the store will pass an action of type "firstAction" to the reducer to initialize the state. Action creators are funtions that return an Action. This is common practice in Redux.

### Dispatch()

The Dispatch function sends an Action to the Reducer to change the WareHouse state

### combineReducers()

combineReducers receives any number of arguments. If an argument is a valid reducer function, it will create a new function that chains all valid reducer functions passed as arguments. The chain is basically just calling function after function from left to right. If an argument is invalid it is ignored.

### inject()

this function is equivalent to Redux connect(). It receives a component and an injection function. The injection function must receive one parameter and it will receive the WareHouse state. This function must return what piece of state wants to be injected into the component. There is an alternative component version of this.

### getState()

returns the current WareHouse state.

### hasStateChanged()

returns whether state has changed or not.

### getStore()

returns the WareHouse instance.
