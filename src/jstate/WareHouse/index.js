import React from 'react'
import Store from '../Store'

class WareHouse extends React.Component{
	constructor(props){
		super(props);
		const { reducer } = props;
		this.state = {store : new Store(reducer)};
	}

	render(){
		return(
			this.props.children
		);
	}
}

export default WareHouse;
