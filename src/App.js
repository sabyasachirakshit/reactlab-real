import React from "react";
import ReactBeautifulDND from "./test_components/ReactBeautifulDND";
import "./App.css";
import DragDrop from "./test_components/DragDrop";
import LazyLoadLab from "./test_components/LazyLoadLab";


function App() {
  return(
    <div className="App">
      {/* <DragDrop /> */}
      {/* <ReactBeautifulDND /> */}
      <LazyLoadLab />
    </div>
  )
}

export default App;