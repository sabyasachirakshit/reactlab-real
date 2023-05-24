import React from "react";
import ReactBeautifulDND from "./test_components/ReactBeautifulDND";
import "./App.css";
import DragDrop from "./test_components/DragDrop";
import LazyLoadLab from "./test_components/LazyLoadLab";
import TrelloTest from "./test_components/TrelloTest";


function App() {
  return(
    <div className="App">
      {/* <DragDrop /> */}
      {/* <ReactBeautifulDND /> */}
      {/* <LazyLoadLab /> */}
      <TrelloTest />
    </div>
  )
}

export default App;