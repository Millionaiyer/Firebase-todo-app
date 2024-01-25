import { useState, useEffect } from "react";
import { Todo } from "../components/Todo";
import { AiOutlinePlus } from "react-icons/ai";
import { db } from "../firebase";
import {
  query,
  collection,
  onSnapshot,
  QuerySnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
    container: `bg-slate-100 max-w-[800px] w-full m-auto rounded-md shadow-xl p-4`,
    heading: `text-3xl font-bold text-center text-gray-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
    count: `text-center p-2`,
  };

  const { user, activeUser } = UserAuth();

  console.log(user.email, "users");

  const [todos, setTodos] = useState([]); // store values of todos in state
  const [input, setInput] = useState(""); // store values of input in state

  // Create Todo

  const createTodo = async (e) => {
    // function to create add todos
    e.preventDefault(e); // prevents the form from reloading
    if (input === "") {
      // checks the value of input
      alert("please enter a valid todo"); // runs an alert box if value of the input is an empty string
      return;
    }
    await addDoc(collection(db, "todos"), {
      // creates or updated the collection todos if it already exists
      email: user.email,
      text: input, //adds text  to todos collection
      completed: false, // adds completed to todos collection
    });
    setInput(""); // resets the value of input to an empty string
  };

  // Read Todo
  useEffect(() => {
    const querry = query(
      collection(db, "todos"),
      where("email", "==", user.email)
    ); // write or checks the db
    const unsubscribe = onSnapshot(querry, (snapshot) => {
      // take snapshots,screenshot of your db to see if any changes happened
      let todosArr = []; // creates an empty array to store todos for later

      snapshot.forEach((doc) => {
        // iterates or loops through the data of the Query snapshot
        todosArr.push({ ...doc.data(), id: doc.id }); // pushes data into the new array with new id for each
        console.log(doc.data(), "data");
      });

      setTodos(todosArr); // update values of todos
    });
    return () => unsubscribe;
  }, []);

  // Update Firebase

  const toggleComplete = async (todo) => {
    // function to update todos in the collection

    await updateDoc(doc(db, "todos", todo.id, user.email), {
      // update the value of todos using the id
      completed: !todo.completed, // changes the value of field : completed
    });
    console.log(user.email);
  };

  // DeleteTodo
  const deleteTodo = async (todo) => {
    await deleteDoc(doc(db, "todos", todo.id));
  };

  return (
    <>
      <section className={style.bg}>
        <div className={style.container}>
          <h3 className={style.heading}>Todo App of {user.email}</h3>
          <form className={style.form} onSubmit={createTodo}>
            <input
              className={style.input}
              type="text"
              placeholder="Add To Do"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className={style.button}>{<AiOutlinePlus />}</button>
          </form>
          <ul>
            {todos.map((todo, index) => {
              // if (user.email === todo.email) {
              return (
                <Todo
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              );
              // } else {
              //   <h1>hello world</h1>;
              // }
            })}
          </ul>
          {todos.length < 1 ? null : (
            <p className={style.count}>{`You have ${todos.length} Todos`}</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
