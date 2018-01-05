import React from 'react';
import { dispatch , getState } from './jstate';

dispatch({ type: "ADD_FLOWER" , flower: "tullips" , count: 1 });
dispatch({ type: "NEW_POT"    , color : "green"   , count: 1 });
dispatch({ type: "ADD_POT"    , color : "green"   , count: 5 });

//Example usage of JState
class App extends React.Component{
  

  renderFlowers = () =>{
    let ret = []
    ret.push(<h1>Flowers</h1>)
    let flowers = getState()["flowers"];
    console.log(flowers);
  }

  renderPots = () =>{

  }

  render = () =>{
    const { renderFlowers , renderPots } = this;
    return(
      <div>
        <div>
          {renderFlowers()}
        </div>
        <div>
          {renderPots()}
        </div>
      </div>)
  }
}

export default App;
