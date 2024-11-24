import * as React from "react";

export function Counter({ incrementCounter, decrementCounter }) {
  return (
    <div className="counter">
      <button onClick={decrementCounter}>-</button>
      <button onClick={incrementCounter}>+</button>
    </div>
  );
}
