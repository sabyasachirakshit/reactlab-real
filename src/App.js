import React from "react";
import ReactBeautifulDND from "./test_components/ReactBeautifulDND";
// import "./App.css";
import DragDrop from "./test_components/DragDrop";
import LazyLoadLab from "./test_components/LazyLoadLab";
import TrelloTest from "./test_components/TrelloTest";
import Trello from "./test_components/Trello";
import TrelloCol from "./test_components/TrelloCol";

function App() {
  return (
    <div className="App">
      {/* <DragDrop /> */}
      {/* <ReactBeautifulDND /> */}
      {/* <LazyLoadLab /> */}
      {/* <TrelloTest /> */}
      {/* <Trello /> */}
      <TrelloCol />
    </div>
  );
}

export default App;
