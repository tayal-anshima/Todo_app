import "./App.css";
import React from "react";
import Title from "./components/Title";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db,signInWithGoogle } from "./firebase";


function App() {
 
  const [todos, setTodos] = React.useState([]);
    
  React.useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => unsub();
  }, []);

  const handleEdit = async (todo, title) => {
    await updateDoc(doc(db, "todos", todo.id), { title: title });
  };
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  return (
    <Router className="App">
     
      <Routes>
           <Route exact path="/" element={ 
           <div className="btn"><Link to="/display" className="signIn-btn" onClick={signInWithGoogle}>Sign in with Google</Link></div>}/>
           <Route exact path="/display" element={
            <div>
            <div>
              <Title />
            </div>
            <div>
              <AddTodo userId={localStorage.getItem("userId")} />
            </div>
            <div className="todo_container">
              {todos.map((todo) => (
                <Todo
                  key={todo.id}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                />
              ))}
            </div>
            </div>
         }/>
      
     
       </Routes>
    </Router>
  );
}
export default App;
