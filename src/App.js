import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import React from "react";
import "./App.css";

const DATA = [
  {
    id: "0e2f0db1-5457-46b0-949e-8032d2f9997a",
    name: "Walmart",
    items: [
      { id: "26fd50b3-3841-496e-8b32-73636f6f4197", name: "3% Milk" },
      { id: "b0ee9d50-d0a6-46f8-96e3-7f3f0f9a2525", name: "Butter" },
    ],
    tint: 1,
  },
  {
    id: "487f68b4-1746-438c-920e-d67b7df46247",
    name: "Indigo",
    items: [
      {
        id: "95ee6a5d-f927-4579-8c15-2b4eb86210ae",
        name: "Designing Data Intensive Applications",
      },
      { id: "5bee94eb-6bde-4411-b438-1c37fa6af364", name: "Atomic Habits" },
    ],
    tint: 2,
  },
  {
    id: "25daffdc-aae0-4d73-bd31-43f73101e7c0",
    name: "Lowes",
    items: [
      { id: "960cbbcf-89a0-4d79-aa8e-56abbc15eacc", name: "Workbench" },
      { id: "d3edf796-6449-4931-a777-ff66965a025b", name: "Hammer" },
    ],
    tint: 3,
  },
];

function App() {
  const [stores, setStores] = useState(DATA);

  const handleDragDrop = (results) => {
    const { source, destination, type } = results;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    if (type === "group") {
      const reorderedStores = [...stores];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;
      const [removedStore] = reorderedStores.splice(sourceIndex, 1);
      reorderedStores.splice(destinationIndex, 0, removedStore);
      return setStores(reorderedStores);
    }
  };
  return (
    <div className="layout__wrapper">
      <div className="card">
        <DragDropContext onDragEnd={handleDragDrop}>
          <div className="header">
            <h1>Shopping List</h1>
          </div>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {stores.map((store, index) => (
                  <Draggable
                    draggableId={store.id}
                    key={store.id}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="store-container"
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <h3>{store.name}</h3>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;

// import React, { useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// const items = [
//   { id: "1", name: "Item 1" },
//   { id: "2", name: "Item 2" },
//   { id: "3", name: "Item 3" },
//   { id: "4", name: "Item 4" },
//   { id: "5", name: "Item 5" },
// ];

// function App() {
//   const [list, setList] = useState(items);

//   const onDragEnd = (result) => {
//     if (!result.destination) return;

//     const items = Array.from(list);
//     const [reorderedItem] = items.splice(result.source.index, 1);
//     items.splice(result.destination.index, 0, reorderedItem);

//     setList(items);
//   };

//   return (
//     <DragDropContext onDragEnd={onDragEnd}>
//       <Droppable droppableId="list">
//         {(provided) => (
//           <ul {...provided.droppableProps} ref={provided.innerRef}>
//             {list.map((item, index) => (
//               <Draggable key={item.id} draggableId={item.id} index={index}>
//                 {(provided) => (
//                   <li
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}
//                     ref={provided.innerRef}
//                   >
//                     {item.name}
//                   </li>
//                 )}
//               </Draggable>
//             ))}
//             {provided.placeholder}
//           </ul>
//         )}
//       </Droppable>
//     </DragDropContext>
//   );
// }

// export default App;
