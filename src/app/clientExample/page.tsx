"use client"; // This file is only executed on the client

import { useState } from "react";

export default function ClientExample() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <div>client example</div>
      <div>
        {/* increment */}
        <button onClick={() => setCount((count) => count + 1)}>+</button>
        {/* decrement */}
        <button onClick={() => setCount((count) => count - 1)}>-</button>
        {/* reset */}
        <button onClick={() => setCount(0)}>0</button>
        {/* count */}
        <span>{count}</span>
      </div>
    </main>
  );
}
