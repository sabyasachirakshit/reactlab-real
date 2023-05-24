import React, { useState } from "react";

// Board component
const Board = () => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState("");

  const handleAddList = () => {
    if (newListTitle !== "") {
      const newList = {
        id: Date.now(),
        title: newListTitle,
        cards: [],
      };

      setLists([...lists, newList]);
      setNewListTitle("");
    }
  };

  const handleAddCard = (listId, newCardText) => {
    if (newCardText !== "") {
      const updatedLists = lists.map((list) => {
        if (list.id === listId) {
          const newCard = {
            id: Date.now(),
            text: newCardText,
          };
          return {
            ...list,
            cards: [...list.cards, newCard],
          };
        }
        return list;
      });

      setLists(updatedLists);
    }
  };

  return (
    <div className="board">
      <div className="add-list">
        <input
          type="text"
          placeholder="Enter list title..."
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={handleAddList}>Add List</button>
      </div>

      <div className="lists">
        {lists.map((list) => (
          <List key={list.id} list={list} onAddCard={handleAddCard} />
        ))}
      </div>
    </div>
  );
};

// List component
const List = ({ list, onAddCard }) => {
  const [newCardText, setNewCardText] = useState("");

  const handleAddCard = () => {
    if (newCardText !== "") {
      onAddCard(list.id, newCardText);
      setNewCardText("");
    }
  };

  return (
    <div className="list">
      <h3>{list.title}</h3>
      <div
        className="cards"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "30%",
        }}
      >
        {list.cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
      <div className="add-card">
        <input
          type="text"
          placeholder="Enter card text..."
          value={newCardText}
          onChange={(e) => setNewCardText(e.target.value)}
        />
        <button onClick={handleAddCard}>Add Card</button>
      </div>
    </div>
  );
};

// Card component
const Card = ({ card }) => {
  return <div className="card">{card.text}</div>;
};

// TrelloTest component
const TrelloTest = () => {
  return (
    <div className="TrelloTest">
      <h1>Trello Demo</h1>
      <Board />
    </div>
  );
};

export default TrelloTest;
