import "./App.css";
import { useState, useEffect } from "react";
import { Todo } from "./components/todo";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
} from "firebase/firestore";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];

      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);

  const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container: `bg-slate-100 max-w-[800px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
  };

  return (
    <>
      <div className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App</h3>
          <form className={style.form}>
            <input
              className={style.input}
              type="text"
              placeholder="Add To Do"
            />
            <button className={style.button}>{<AiOutlinePlus />}</button>
          </form>
          <ul>
            {todos.map((todo, index) => {
              return <Todo todo={todo} key={index} />;
            })}
          </ul>
          <p className={style.count}>You have 2 Todos</p>
        </div>
      </div>
    </>
  );
};

export default App;
