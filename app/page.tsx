"use client";
import { useState } from "react";

interface Point {
  clientX: number;
  clientY: number;
}

export default function Home() {
  const [points, setPoints] = useState<Point[]>([]);
  const [redo, setRedo] = useState<Point[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setPoints((prev) => [...prev, { clientX, clientY }]);
    setRedo([]);
  };

  const handleUndoPoint = () => {
    if(points.length > 0){
      setRedo((prev) => [...prev, points[points.length - 1]]);
    const newArray = points.slice(0, -1);
    setPoints(newArray);
    }
  };

  const handleRedoPoint = () => {
    if (redo.length > 0) {
      setPoints((prev) => [...prev, redo[redo.length - 1]]);
      const newArray = redo.slice(0, -1);
      setRedo(newArray);
    }
  };

  return (
    <div>
      <div className="buttons">
        <button onClick={handleUndoPoint}>Undo</button>
        {redo.length ? <button onClick={handleRedoPoint}>Redo</button> : null}
      </div>
      <div onClick={(e) => handleClick(e)} className="container">
        {points.map((point, index) => (
          <div
            key={index}
            className="point"
            style={{ left: point.clientX - 25, top: point.clientY - 25 }}
          ></div>
        ))}
      </div>
    </div>
  );
}
