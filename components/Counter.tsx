"use client";

import React, { useState } from "react";
import {
  increment,
  decrement,
  incrementByAmount,
} from "@/lib/features/counter/counterSlice";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

export default function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementValue, setIncrementValue] = useState(2);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Redux Counter</h2>

      <div className="flex flex-col items-center">
        <div className="text-6xl font-bold mb-4">{count}</div>

        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => dispatch(decrement())}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Decrease
          </button>

          <button
            onClick={() => dispatch(increment())}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Increase
          </button>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <input
            type="number"
            value={incrementValue}
            onChange={(e) => setIncrementValue(Number(e.target.value) || 0)}
            className="border rounded px-2 py-1 w-20 text-center"
          />

          <button
            onClick={() => dispatch(incrementByAmount(incrementValue))}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
}
