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
    <div className="App">
      <h1>TODO React Firebase</h1>
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit" onClick={addTodo}>
          Add Todo
        </button>
      </form>
      <ul>
        {todos.map((it) => (
          <li>
            <Todo key={it.id} arr={it} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
