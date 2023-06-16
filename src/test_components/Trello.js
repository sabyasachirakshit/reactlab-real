import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { Modal, Input, Dropdown, Menu, Button, Tag, Popconfirm } from "antd";
import { MoreOutlined } from "@ant-design/icons";

const requestedItemsFromBackend = [
  {
    id: uuid(),
    content: "Make Trello board UI",
    tags: [
      { name: "React JS", color: "#FFCDD2" },
      { name: "pointers", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Use React-Beautiful-DND package",
    tags: [
      { name: "React JS", color: "#FFCDD2" },
      { name: "pointers", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Make Multiple Lanes",
    tags: [
      { name: "React JS", color: "#FFCDD2" },
      { name: "pointers", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Write logic for Draggable",
    tags: [
      { name: "React JS", color: "#FFCDD2" },
      { name: "pointers", color: "#BBDEFB" },
    ],
  },
];

const requestedItemsFromBackend2 = [
  {
    id: uuid(),
    content: "Clean House",
    tags: [
      { name: "Cleaning", color: "#FFCDD2" },
      { name: "Hobby", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Buy Groceries",
    tags: [{ name: "Shopping", color: "#FFCDD2" }],
  },
  {
    id: uuid(),
    content: "Cook Food",
    tags: [
      { name: "Cooking", color: "#FFCDD2" },
      { name: "Hobby", color: "#BBDEFB" },
    ],
  },
];

const requestedItemsFromBackend3 = [
  {
    id: uuid(),
    content: "Go for Morning Walk",
    tags: [
      { name: "Health", color: "#FFCDD2" },
      { name: "Workout", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Organize Accessories",
    tags: [
      { name: "Personal", color: "#FFCDD2" },
      { name: "Home", color: "#BBDEFB" },
      { name: "Cleanliness", color: "#C8E6C9" },
    ],
  },
  {
    id: uuid(),
    content: "Read Books",
    tags: [
      { name: "Hobby", color: "#FFCDD2" },
      { name: "Reading", color: "#BBDEFB" },
      { name: "Entertainment", color: "#C8E6C9" },
    ],
  },
];

const requestedItemsFromBackend4 = [
  {
    id: uuid(),
    content: "Watch Football Match",
    tags: [
      { name: "Game", color: "#FFCDD2" },
      { name: "Entertainment", color: "#BBDEFB" },
    ],
  },
  {
    id: uuid(),
    content: "Hang out with Friends",
    tags: [{ name: "Entertainment", color: "#FFCDD2" }],
  },
];

const columnsFromBackend = {
  [uuid()]: {
    name: "Work",
    items: requestedItemsFromBackend,
    inputValue: "",
  },
  [uuid()]: {
    name: "Home",
    items: requestedItemsFromBackend2,
    inputValue: "",
  },
  [uuid()]: {
    name: "Personal",
    items: requestedItemsFromBackend3,
    inputValue: "",
  },
  [uuid()]: {
    name: "Miscellaneous",
    items: requestedItemsFromBackend4,
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
  const findTagsForCardId = (cardId, items) => {
    const matchingItem = items.find((item) => item.id === cardId);
    if (matchingItem) {
      return matchingItem.tags;
    }
    return [];
  };

  const allItems = [
    ...requestedItemsFromBackend,
    ...requestedItemsFromBackend2,
    ...requestedItemsFromBackend3,
    ...requestedItemsFromBackend4,
  ];

  const tagsFromAllItems = findTagsForCardId(cardId, allItems);
  console.log(tagsFromAllItems);

  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedTags, setUpdatedTags] = useState([]);

  const handleUpdateCardModalDetails = () => {
    if (updatedTitle && updatedTitle !== "") {
      onUpdateTitle(cardId, updatedTitle);
    }
    if (updatedTags.length) {
      onUpdateTags(cardId, updatedTags);
    }
    onClose();
  };

  const handleTagsInputChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setUpdatedTags(tags);
  };

  return (
    <Modal
      title="Update Card Details"
      open={true}
      onCancel={onClose}
      onOk={handleUpdateCardModalDetails}
    >
      <Input
        value={updatedTitle}
        style={{ marginBottom: 10 }}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        placeholder="Update Your Card Title"
      />
      <Input
        value={updatedTags}
        style={{ marginBottom: 10 }}
        onChange={handleTagsInputChange}
        placeholder="Update Your Tags Separated By Commas"
      />
      {tagsFromAllItems.map((tag, index) => {
        return (
          <div
            className="all-tags"
            key={index}
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <div className="tag" style={{ display: "flex", gap: "5px" }}>
              <div className="tag-name">
                <b>Tag:</b>
                {tag.name}
              </div>
              <div className="tag-color">
                <b>Color:</b>
                {tag.color}
              </div>
            </div>
          </div>
        );
      })}
    </Modal>
  );
}

function Trello() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownButtonText, setDropdownButtonText] =
    useState("Group by Status");

  const handleMenuClick = (e) => {
    if (e.key === "option1") {
      setColumns(columnsFromBackend);
    }

    if (e.key === "option2") {
      const allTags = [];
      const cardsByTag = {};

      for (const columnId in columns) {
        const column = columns[columnId];

        for (const item of column.items) {
          for (const tag of item.tags) {
            const tagName = tag.name;
            if (!allTags.includes(tagName)) {
              allTags.push(tagName);
            }

            if (!cardsByTag[tagName]) {
              cardsByTag[tagName] = [];
            }

            cardsByTag[tagName].push(item);
          }
        }
      }

      setColumns({});

      const newColumns = {};
      for (const tag of allTags) {
        newColumns[uuid()] = {
          name: tag,
          items: cardsByTag[tag],
          inputValue: "",
        };
      }

      setColumns(newColumns);
    }

    setDropdownButtonText(e.item.props.children);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="option1">Group by Status</Menu.Item>
      <Menu.Item key="option2">Group by Tags</Menu.Item>
    </Menu>
  );

  const handleDeleteCard = (columnId, cardId) => {
    const column = columns[columnId];
    const updatedColumns = { ...columns };
    const updatedItems = column.items.filter((item) => item.id !== cardId);
    column.items = updatedItems;
    setColumns(updatedColumns);
  };

  const handleMoreMenuClick = (menuClickEvent, cardId, columnId) => {
    const { key } = menuClickEvent;
    if (key === "edit") {
      setSelectedCardId(columnId);
      setIsModalOpen(true);
    } else if (key === "delete") {
      console.log(cardId);
    }
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

  const handleDeleteLane = (columnId) => {
    const column = columns[columnId];

    Modal.confirm({
      title: "Delete Lane",
      content: (
        <p>
          Are you sure you want to delete the lane{" "}
          <strong>{column.name}</strong>?
        </p>
      ),
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        const updatedColumns = { ...columns };
        delete updatedColumns[columnId];
        setColumns(updatedColumns);
      },
    });
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
      <div
        className="corner-menu"
        style={{
          gap: 20,
          width: "100%",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <button style={{ width: "13%" }} onClick={handleCreateLane}>
          Add New Lane
        </button>
        <Dropdown overlay={menu}>
          <Button style={{ width: "13%" }}>{dropdownButtonText}</Button>
        </Dropdown>
      </div>

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
                <div
                  className="button-area-col"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      position: "relative",
                      top: 5,
                      right: 5,
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      color: "red",
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                    }}
                    onClick={() => handleDeleteLane(id)}
                  >
                    X
                  </button>
                </div>
                <h2>{column.name}</h2>

                <div style={{ margin: 8 }}>
                  <input
                    type="text"
                    value={column.inputValue}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    placeholder="Enter Card Title"
                    style={{ position: "relative", left: 5, width: "66%" }}
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
                                      className="card"
                                      style={{
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "lightgrey"
                                          : "white",
                                        color: "black",
                                        ...provided.draggableProps.style,
                                      }}
                                      // onClick={() => handleCardClick(item.id)}
                                    >
                                      <div
                                        className="button-area"
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          justifyContent: "flex-end",
                                        }}
                                      >
                                        <Dropdown
                                          overlay={
                                            <Menu
                                              onClick={(e) =>
                                                handleMoreMenuClick(
                                                  e,
                                                  id,
                                                  item.id
                                                )
                                              }
                                            >
                                              <Menu.Item key="edit">
                                                Edit Card
                                              </Menu.Item>
                                              <Menu.Item key="delete">
                                                <Popconfirm
                                                  title="Are you sure you want to delete this card?"
                                                  onConfirm={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteCard(
                                                      id,
                                                      item.id
                                                    );
                                                  }}
                                                  okText="Yes"
                                                  cancelText="No"
                                                >
                                                  Delete Card
                                                </Popconfirm>
                                              </Menu.Item>
                                            </Menu>
                                          }
                                          trigger={["click"]}
                                        >
                                          <MoreOutlined />
                                        </Dropdown>
                                      </div>

                                      <div
                                        style={{
                                          cursor: "pointer",
                                          marginBottom: 18,
                                        }}
                                      >
                                        <b>{item.content}</b>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          gap: 4,
                                          flexWrap: "wrap",
                                          marginBottom: 16,
                                        }}
                                      >
                                        {item.tags &&
                                          item.tags.map((tag, tagIndex) => (
                                            <Tag
                                              key={tagIndex}
                                              color={tag.color}
                                              style={{
                                                padding: 10,
                                                cursor: "pointer",
                                                color: "black",
                                                width:
                                                  tag.length < 5
                                                    ? "32%"
                                                    : "fit-content",
                                                textAlign: "center",
                                                borderRadius: 20,
                                              }}
                                            >
                                              {tag.name}
                                            </Tag>
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
