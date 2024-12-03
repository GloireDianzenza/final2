import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {isExpired} from "react-jwt";

function NewComment({setGlobalUser}) {

    const [user,setUser] = useState({id:0,username:"",email:"",password:"",admin:0})
    const [currentPost,setPost] = useState({id:0,UserId:0,texte:"",image:""})
    const {id,post} = useParams();
    const navigate = useNavigate();

    /**
     * 
     * @param {import('react').BaseSyntheticEvent} event 
     */
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData.entries());
        entries.UserId = parseInt(id);
        entries.PostId = parseInt(post);
        
        fetch("http://localhost:3300/api/comments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entries)})
        .then(response=>response.json())
        .then(data=>{
            if(data.error)throw data;
            alert("Commentaire posté avec succès");
            navigate("/final2/main/"+id);
        })
        .catch(error=>{alert(JSON.stringify(error));navigate("/final2/comment/"+id+"/"+post)});
    }

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
        if(post === undefined)navigate("/");
        fetch("http://localhost:3300/api/posts/"+post)
        .then(response=>response.json())
        .then(data=>{
            setPost(data)
        })
        .catch(error=>{alert(JSON.stringify(error));navigate("/");});
    },[])

    return (<main className='new-comment w-full sm:pt-[10%] pt-[250px] flex flex-col gap-[30px] items-center justify-start pb-[100px]'>
        <h1 className='text-5xl'>Commenter</h1>
        <h2>{currentPost.texte}</h2>
        <img src={currentPost.image} alt="" className='w-full sm:w-1/2' />
        <form action="" className='flex flex-col items-center gap-5' onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="value">Nouveau texte</label>
                <textarea name="value" id="value" required placeholder='Texte'></textarea>
            </div>
            <button type='submit' className='bg-green-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Commenter</button>
        </form>
    </main>);
}

export default NewComment;