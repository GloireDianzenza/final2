import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {isExpired} from "react-jwt";
import PostMain from '../components/PostMain';
import "./main.css";

function Main({setGlobalUser,allUsers,allComments}) {

    const [user,setUser] = useState({id:0,username:"",email:"",password:"",admin:0})
    const [posts,setPosts] = useState([{id:0,UserId:0,texte:"",image:""}])
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id === undefined)navigate("/");
        fetch("http://localhost:3300/api/users/"+id)
        .then(response=>response.json())
        .then(data=>{
            setUser(data);
            setGlobalUser(data);
        })
        .catch(error=>{alert(JSON.stringify(error));navigate("/");});
    },[])

    useEffect(()=>{
        if(user.id === 0)return;
        if(!sessionStorage.getItem("token"))navigate("/");
        const token = sessionStorage.getItem("token");
        if(isExpired(token))navigate("/");
    },[user])

    useEffect(()=>{
        setPosts([]);
        fetch("http://localhost:3300/api/posts")
        .then(response=>response.json())
        .then(data=>{
            setPosts(data);
        })
        .catch(error=>{alert(JSON.stringify(error))});
    },[])

    useEffect(()=>{
        if(posts.length <= 1)return;
        if(user.id === 0)navigate("/");
    },[posts])

    return (<main className='main w-full sm:pt-[10%] pt-[250px] flex flex-col gap-[30px] items-center justify-start pb-[100px]'>
            <h1 className='text-5xl'>Liste des posts</h1>
            <div className="posts w-full min-h-fit flex flex-col sm:flex-row justify-around items-center gap-5 flex-wrap">
                {posts.length > 1 && posts.map((post,idx)=><PostMain key={post.id} currentUserId={id} id={idx} value={post} allUsers={allUsers} allComments={allComments}/>)}
            </div>
    </main>);
}

export default Main;