import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Modal, Input } from "antd";

const requestedItemsFromBackend = [
  { id: uuid(), content: "Make Trello board UI", tags: ["UI", "Frontend"] },
  {
    id: uuid(),
    content: "Use React-Beautiful-DND package",
    tags: ["UI", "Frontend"],
  },
  { id: uuid(), content: "Make Multiple Lanes", tags: ["UI", "Frontend"] },
  {
    id: uuid(),
    content: "Write logic for Draggable",
    tags: ["UI", "Frontend"],
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Requested",
    items: requestedItemsFromBackend,
    inputValue: "",
  },
  [uuid()]: {
    name: "To Do",
    items: [],
    inputValue: "",
  },
  [uuid()]: {
    name: "In Progress",
    items: [],
    inputValue: "",
  },
  [uuid()]: {
    name: "Completed",
    items: [],
    inputValue: "",
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function CardDetailModal({ cardId, onClose, onUpdateTitle, onUpdateTags }) {
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedTags, setUpdatedTags] = useState([]);

  const handleUpdateTitle = () => {
    onUpdateTitle(cardId, updatedTitle);
    onClose();
  };

  const handleUpdateTags = () => {
    onUpdateTags(cardId, updatedTags);
    onClose();
  };

  return (
    <Modal
      title="Update Card Details"
      visible={true}
      onCancel={onClose}
      onOk={handleUpdateTitle}
    >
      <Input
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Enter new title"
      />
      <Input
        value={updatedTags.join(", ")}
        onChange={(e) =>
          setUpdatedTags(e.target.value.split(",").map((tag) => tag.trim()))
        }
        placeholder="Enter tags separated by commas"
      />
      <button onClick={handleUpdateTags}>Update Tags</button>
    </Modal>
  );
}

function Trello() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (cardId) => {
    setSelectedCardId(cardId);
    setIsModalOpen(true);
  };

  const handleUpdateTags = (cardId, updatedTags) => {
    const updatedColumns = { ...columns };

    for (const columnId in updatedColumns) {
      const column = updatedColumns[columnId];
      const cardIndex = column.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.items[cardIndex].tags = updatedTags;
        break;
      }
    }

    setColumns(updatedColumns);
  };

  const handleUpdateTitle = (cardId, updatedTitle) => {
    const updatedColumns = { ...columns };

    for (const columnId in updatedColumns) {
      const column = updatedColumns[columnId];
      const cardIndex = column.items.findIndex((card) => card.id === cardId);
      if (cardIndex !== -1) {
        column.items[cardIndex].content = updatedTitle;
        break;
      }
    }

    setColumns(updatedColumns);
  };

  const handleInputChange = (columnId, value) => {
    setColumns((prevColumns) => ({
      ...prevColumns,
      [columnId]: {
        ...prevColumns[columnId],
        inputValue: value,
      },
    }));
  };

  const handleAddCard = (columnId) => {
    const column = columns[columnId];
    if (column.inputValue && column.inputValue !== "") {
      const newCard = {
        id: uuid(),
        content: column.inputValue,
      };
      const updatedItems = [...column.items, newCard];

      setColumns((prevColumns) => ({
        ...prevColumns,
        [columnId]: {
          ...prevColumns[columnId],
          items: updatedItems,
          inputValue: "",
        },
      }));
    }
  };

  const handleCreateLane = () => {
    const newLaneName = prompt("Name Your Lane");
    if (newLaneName && newLaneName !== "") {
      const newColumnId = uuid();
      const newColumn = {
        name: newLaneName,
        items: [],
        inputValue: "",
      };
      setColumns((prevColumns) => ({
        ...prevColumns,
        [newColumnId]: newColumn,
      }));
    }
  };

  return (
    <div
      className="Trello-UI"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 10,
        gap: 12,
      }}
    >
      <button style={{ width: "13%" }} onClick={handleCreateLane}>
        Add New Lane
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([id, column]) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <input
                    type="text"
                    value={column.inputValue}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    placeholder="Enter card content"
                  />
                  <button onClick={() => handleAddCard(id)}>Add Card</button>
                </div>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={id} key={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: "fit-content",
                          }}
                        >
                          {column.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263b4a"
                                          : "#456c86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
                                      onClick={() => handleCardClick(item.id)}
                                    >
                                      {item.content}
                                      <div style={{ marginTop: 8 }}>
                                        Tags:{" "}
                                        {item.tags &&
                                          item.tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                          ))}
                                      </div>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
      {isModalOpen && (
        <CardDetailModal
          cardId={selectedCardId}
          onClose={() => setIsModalOpen(false)}
          onUpdateTitle={handleUpdateTitle}
          onUpdateTags={handleUpdateTags}
        />
      )}
    </div>
  );
}

export default Trello;
