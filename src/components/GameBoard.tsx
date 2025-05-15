import React from "react";
import { useSelector } from "react-redux";
import { GRID_SIZE, selectGame } from "../store/gameSlice";
import styled from "styled-components";

const Board = styled.div<{ $gridSize: number }>`
  grid-template-rows: repeat(
    ${(props) => (props.$gridSize ? props.$gridSize : 20)},
    1fr
  );
  grid-template-columns: repeat(
    ${(props) => (props.$gridSize ? props.$gridSize : 20)},
    1fr
  );
  width: min(90vw, 600px);
  height: min(90vw, 600px);
  gap: 1px;
`;

const SnakeBody = styled.div.attrs<{ $x: number; $y: number }>((props) => ({
  style: {
    gridRowStart: props.$x || 1,
    gridColumnStart: props.$y || 1,
  },
}))`
  background: var(--color-snake-body);
`;

const SnakeHead = styled(SnakeBody)`
  background: var(--color-snake-head);
  &::after {
    content: "";
    width: 4px;
    height: 4px;
    background: black;
    border-radius: 50%;
  }
`;

const GameBoard: React.FC = () => {
  const { snake, food } = useSelector(selectGame);

  return (
    <Board
      $gridSize={GRID_SIZE}
      className="grid bg-game-bg border border-grid-border rounded-lg overflow-hidden shadow-xl"
    >
      {snake.map((segment, index) => {
        const style = {
          gridRowStart: segment.x,
          gridColumnStart: segment.y,
        };
        return index === 0 ? (
          <SnakeHead
            className="rounded-md flex items-center justify-center relative transition-all duration-100"
            key={index}
            $x={segment.x}
            $y={segment.y}
          />
        ) : (
          <SnakeBody
            className="transition-all duration-100"
            key={index}
            style={style}
            $x={segment.x}
            $y={segment.y}
          />
        );
      })}
      <div
        className="bg-food rounded-full animate-pulse-soft transition-all duration-100"
        style={{ gridRowStart: food.x, gridColumnStart: food.y }}
      />
    </Board>
  );
};

export default GameBoard;
