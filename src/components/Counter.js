import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Clock from "./Clock";
import { decrement, increment } from './counterSlice'
import Todos from "./todo/Todos";

function Counter() {
    // const [inc, setInc] = useState(10)
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()

    // function increment() {
    //     setInc(inc+1)
    // }

    // function decrement() {
    //     if (inc != 0)
    //     setInc(inc-1)
    // }
    
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={() => dispatch(increment())}>
            +
            </button>
            |||
            <button onClick={() => dispatch(decrement())}>
            -
            </button>
            <Todos />
        </div>
    )
}

export default Counter