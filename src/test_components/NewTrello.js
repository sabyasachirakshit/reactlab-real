import React, { useState } from "react";
import Board from "react-trello";

const initialBoardData = {
  lanes: [
    {
      id: "lane1",
      title: "Lane 1",
      cards: [
        { id: "card1", title: "Card 1" },
        { id: "card2", title: "Card 2" },
        { id: "card3", title: "Card 3" },
      ],
    },
    {
      id: "lane2",
      title: "Lane 2",
      cards: [
        { id: "card4", title: "Card 4" },
        { id: "card5", title: "Card 5" },
      ],
    },
  ],
};

function NewTrello() {
  const [boardData, setBoardData] = useState(initialBoardData);
  const handleCardMove = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    const newBoardData = { ...boardData };
    const sourceLane = newBoardData.lanes.find(
      (lane) => lane.id === sourceLaneId
    );
    const targetLane = newBoardData.lanes.find(
      (lane) => lane.id === targetLaneId
    );
    const cardIndex = sourceLane.cards.findIndex((card) => card.id === cardId);
    const [removedCard] = sourceLane.cards.splice(cardIndex, 1);
    targetLane.cards.splice(position, 0, removedCard);

    setBoardData(newBoardData);
  };

  return (
    <Board
      editable
      data={boardData}
      draggable
      handleCardMove={handleCardMove}
    />
  );
}

export default NewTrello;
