import React from "react";
import ReactBeautifulDND from "./test_components/ReactBeautifulDND";
// import "./App.css";
import DragDrop from "./test_components/DragDrop";
import LazyLoadLab from "./test_components/LazyLoadLab";
import TrelloTest from "./test_components/TrelloTest";
import KanbanBoard from "./test_components/KanbanBoard";

function App() {
  return (
    <div className="App">
      {/* <DragDrop /> */}
      {/* <ReactBeautifulDND /> */}
      {/* <LazyLoadLab /> */}
      {/* <TrelloTest /> */}
      <KanbanBoard />
    </div>
  );
}

export default App;
