import React from 'react';
import MdsTree from "./components/mdsTree";
import {Provider} from "react-redux";
import {setUpStore} from "./store/store";

function App() {
  return (
    <div className="App">
        <Provider store={setUpStore()}>
            <MdsTree/>
        </Provider>
    </div>
  );
}

export default App;
