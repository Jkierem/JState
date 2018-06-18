import React from 'react';
import { dispatch , getState , hasStateChanged , inject } from '../juanstate';

//Example usage of JState
class App extends React.Component{

  constructor(props){
    super(props)
    dispatch({ type: "ADD_FLOWER" , flower: "tullip" , count: 1 });
    dispatch({ type: "NEW_POT"    , color : "green"   , count: 1 });
    dispatch({ type: "ADD_POT"    , color : "green"   , count: 5 });
    //dispatch({ type: "DELETE_FLOWER" , flower: "tullip" })
    let st = getState()
    this.state = {
      flowers: st.flowers,
      pots: st.pots
    }
  }

  renderFlowers = () =>{
    let ret = []
    ret.push(<h1 key="_flower_title">Flowers</h1>)
    const { flowers } = getState()
    for (let flower in flowers) {
      if (flowers.hasOwnProperty(flower)) {
        ret.push(<p key={flower}>{`${flower}: ${flowers[flower]}`}</p>)
      }
    }
    return ret
  }

  renderPots = () =>{
    let ret = []
    ret.push(<h1 key={"_pots_title"}>Pots</h1>)
    const { pots } = getState()
    for (let pot in pots) {
      if (pots.hasOwnProperty(pot)) {
        ret.push(<p key={pot}>{`${pot}: ${pots[pot]}`}</p>)
      }
    }
    return ret
  }

  handleClick = (e) =>{
    e.preventDefault()
    let text = document.getElementById("input").value
    let count = document.getElementById("count").value
    dispatch({ type:"ADD_FLOWER" , flower: text , count: parseInt(count,10) })
    console.log(getState());
    if( hasStateChanged() ){
      let st = getState()
      this.setState({
        flowers: st.flowers,
        pots: st.pots
      })
    }else{
      console.log("it hasn't");
    }
  }

  render = () =>{
    const { renderFlowers , renderPots } = this;
    return(
      <div>
        <div>
          {renderFlowers()}
          <form>
            <input id="input" ></input>
            <input id="count" ></input>
            <button onClick={this.handleClick}>Add Flower</button>
          </form>
        </div>
        <div>
          {renderPots()}
        </div>
      </div>)
  }
}

let injection = (state) => {
  return { flowers: state.flowers }
}

export default inject(App,injection);
