import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase";
import firebase from "firebase/compat/app";
import Todo from "./Todo";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            item: doc.data(),
          }))
        );
      });
  }, [input]);
  const addTodo = (e) => {
    e.preventDefault();
    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="">
      <div className="grid grid-cols-5">
        <div className="col-span-1"></div>
        <div className="col-span-3 rounded bg-green-900 mt-3 py-1">
          <h1 className="text-center text-white text-3xl font-extrabold font-mono">
            TX Todo
          </h1>
        </div>
        <div className="col-span-1"></div>
      </div>
      <div className="mt-5 container mx-auto max-w-md font-mono">
        <form>
          <input
            className="border-2 rounded py-1 bg-green-50 border-green-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="px-3 mx-3  bg-green-800 rounded py-2 text-white text-center hover:bg-green-900 text-semibold"
            type="submit"
            onClick={addTodo}
          >
            Add
          </button>
        </form>
        <h2 className="text-center text-2xl mt-3 font-semibold">
          Already in the list
        </h2>
        <ul className="list-reset text-white p-0">
          {todos.map((it) => (
            <li className="bg-green-900 border-white border-dashed border-2 my-2 py-4 flex items-center">
              <Todo key={it.id} arr={it} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
