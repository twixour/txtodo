import React from "react";
import { db } from "./firebase";
import firebase from "firebase/compat/app";

const Todo = ({ arr }) => {
  return (
    <div>
      <h1>{arr.item.todo}</h1>
      <button
        type="submit"
        onClick={() => db.collection("todos").doc(arr.id).delete()}
      >
        Delete
      </button>
    </div>
  );
};

export default Todo;
