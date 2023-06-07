import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function HorDragDrop() {
  const [dragDropList, setDragDropList] = useState([
    { label: "Item1",id:1 },
    { label: "Item2",id:2 },
    { label: "Item3",id:3 },
  ]);
  const onDragComplete = (result) => {
    if (!result.destination) return;

    const arr = [...dragDropList];

    //Changing the position of Array element
    let removedItem = arr.splice(result.source.index, 1)[0];
    arr.splice(result.destination.index, 0, removedItem);

    //Updating the list
    setDragDropList(arr);
  };
  return (
    <div className="container">
      <div className="card">
        <div className="header">Horizontal Drag and Drop List</div>

        <DragDropContext onDragEnd={onDragComplete}>
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided, snapshot) => (
              <div
                className="drag-drop-list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ display: "flex", gap: "20px" }}
              >
                {dragDropList.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.label}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="item-card"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <span className="material-symbols-outlined">
                          drag_indicator
                        </span>
                        <div className="char-avatar">
                          {item.label.charAt(0)}
                        </div>
                        <p className="label">{item.label}</p>
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

export default HorDragDrop;
