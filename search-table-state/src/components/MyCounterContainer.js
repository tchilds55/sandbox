import * as React from "react";
import { Counter } from "./Counter";

export function MyCounterContainer() {
  const [count, setCount] = React.useState(0);

  const incrementCounter = React.useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  const decrementCounter = React.useCallback(() => {
    setCount((prevCount) => prevCount - 1);
  }, []);

  // const incrementCounter = () => setCount((prevCount) => prevCount + 1);
  // const decrementCounter = () => setCount((prevCount) => prevCount - 1);

  React.useEffect(() => {
    console.log("MyCounterContainer mounted");
    return () => {
      console.log("MyCounterContainer unmounted");
    };
  }, [incrementCounter, decrementCounter]);

  return (
    <div className="counter-container">
      {count}
      <Counter
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
      />
    </div>
  );
}
