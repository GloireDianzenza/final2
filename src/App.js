import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Main from './pages/Main';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import NewPost from './pages/NewPost';
import NewComment from './pages/NewComment';
import Posts from './pages/Posts';
import EditPost from './pages/EditPost';

function App() {

  const [globalUser,setUser] = useState({});
  const [allUsers,setAllUsers] = useState([{}]);
  const [allComments,setAllComments] = useState([{}]);

  useEffect(()=>{
      fetch("http://localhost:3300/api/users")
      .then(response=>response.json())
      .then(data=>{
        setAllUsers(data);
      })
  },[])
  
  useEffect(()=>{
      fetch("http://localhost:3300/api/comments")
      .then(response=>response.json())
      .then(data=>{
        setAllComments(data);
      })
  },[])

  return (
    <div className="App relative w-full min-h-screen bg-black text-white">
      <Header user={globalUser}/>
      <Routes>
          <Route path='*' element={<Navigate to={"/final2/home"}/>}/>
          <Route path='/final2'>
            <Route path='*' element={<Navigate to={"/final2/home"}/>}/>
            <Route path='' element={<Navigate to={"/final2/home"}/>}/>
            <Route path='home' element={<Home setUser={setUser}/>}/>
            <Route path='signup' element={<Signup/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='main/:id' element={<Main setGlobalUser={setUser} allUsers={allUsers} allComments={allComments}/>}/>
            <Route path='add/:id' element={<NewPost setGlobalUser={setUser}/>}/>
            <Route path='edit/:id/:post' element={<EditPost setGlobalUser={setUser}/>}/>
            <Route path='comment/:id/:post' element={<NewComment setGlobalUser={setUser}/>}/>
            <Route path='posts/:id' element={<Posts setGlobalUser={setUser} allComments={allComments} allUsers={allUsers}/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
