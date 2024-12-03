import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {isExpired} from "react-jwt";
import PostList from '../components/PostList';

function Posts({setGlobalUser,allComments,allUsers}) {

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

        if(!sessionStorage.getItem("token"))navigate("/");
        const token = sessionStorage.getItem("token");
        if(isExpired(token))navigate("/");
    },[])
    
    useEffect(()=>{
        if(user.id === 0)return;
        fetch("http://localhost:3300/api/posts/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:user.id})})
        .then(response=>response.json())
        .then(data=>{
            setPosts(data)
        })
        .catch(error=>{alert(JSON.stringify(error));navigate("/");});
    },[user])

    return (<main className='posts w-full sm:pt-[10%] pt-[250px] flex flex-col gap-[30px] items-center justify-start pb-[100px]'>
        <h1 className='text-5xl'>Liste de vos posts</h1>
        <div className="posts w-full min-h-fit flex flex-col sm:flex-row justify-around items-center gap-5 flex-wrap">
            {posts.map((post,idx)=><PostList key={post.id} id={idx} value={post} allComments={allComments} allUsers={allUsers} currentUserId={id}/>)}
        </div>
    </main>);
}

export default Posts;