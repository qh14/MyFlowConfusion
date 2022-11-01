import { getfeature } from "../redux/actions";
import React, { Component } from 'react';
import { useSelector, useDispatch } from "react-redux";
function Test() {
    const dispatch = useDispatch();
    return (
        <button onClick={() => dispatch(getfeature)}>CHANGE</button>
    );
}

export default Test;