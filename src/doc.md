# Firebase and Codebase explanation

## Firebase setup

- Create a firebase account and create a new project , can say no to google anayltics if not needed
- Go to console using the top right icon
- click on the type of application to use ususally it would be Web with the icon '</>'

## Setting up

1. Register App (give a name)
2. In your console type npm install firebase , create firebase.js in your src folder in your codebase
3. copy the whole sdk
4. import firestore from the documentation

```
import { getFirestore } from "firebase/firestore";
```

5. export firestore(app) by in the firestore.js file -

```
export const db = getFirestore(app)
```

## Set up firestore

1. Go to firebase console -> build -> firestore
2. create database -> start in test mode -> choose the location closest to you (probably singapore)

## Using the firestore

1. Create a collection (database) with a name
2. create articles which are just objects inside your database or tables enter field with the name and value as the value of the object

```js
document id = auto generate id
field = text
type = string
value = 'Learn React'

or

document id = auto generate id
name = completed
type  = boolean
value = true || false
```

## Create Todo

1. Create an input,setinput useState

2. In the input tag set `value={input}` and `onChange={(e) => setinput(e.target.value)}`

3. write a async-await function which creates a collection and stores values in it.

- `addDoc()` create a collection(database) with the name todo and has 2 objects with text and completed.

```js
const createTodo = async (e) => {
  e.preventDefault(e);
  console.log(input);
  if (input === "") {
    alert("please enter a valid todo");
    return;
  }
  await addDoc(collection(db, "todos"), {
    text: input,
    completed: false,
  });
  setInpt("");
};
```

#### Note: Incase you directly create a collection using firebase directly it will update the values else it will create a new collection with the given name.

## Read todo using firestore

1. In your file where you want to use the db write everything in your useEffect with empty dependency.

2. import query,collection,onSnapshot,QuerySnapshot, updateDoc, doc.

3. Here you want to write a query to check collection db and todo

```
const q = query(collection(db, "todos"));
```

4. Here we use `useEffect()` with an empty dependency

- `onSnapshot()` is like taking a snapshot or screenshot of our db and reading it to us also checking if any changes on the Firestore Database and updates the front end automatically without refreshing the page. It also takes the parameters as the q which is the query and querySnapshot.

- `querySnapshot()` it contains one or more objects representing the result of the query.

- then here create a new array and push the response of the querySnapshot into a new array using `setState`

```
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];

      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
        console.log(doc.data(), "data");
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);
```

- in our cleanup function we return unsubscribe

## Update todo

1. Here we pass values from the child to the parent using a function from Todo.jsx -> app.jsx

2. we write an onclick function to the <p> tag and onChange function to the checkbox tag and pass toggleComplete(todo) function. Also change the css for it using ternary operator .

3. We write the toggleComplete () using async - await . Here updateDoc updates/changes the value of completed based on todo.id inside the collection todos.

- `updateDoc()` : In updateDoc it updated the changes and using parameters of collection and an input in the collection using it what has to be changed or updated.

```
const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
```

## Delete Todo

1. create a button with onClick with deleteTodo function that will be passed as props from app but will recieve data from todo.id from the Todo.jsx

2. create the function deleteTodo

- `deleteDoc()` here it takes the doc , the collection and delete using what field to delete the data in the collection

```
const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
```
