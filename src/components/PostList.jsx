import React, { useEffect, useState } from 'react';
import CommentMain from './CommentMain';
import { Link, useNavigate } from 'react-router-dom';

function PostList({id,value,allUsers,allComments,currentUserId}) {

    const [user,setUser] = useState({});
    const [concernedComments,setComments] = useState([{}]);
    const navigate = useNavigate("");

    const deleteSelf = () =>{
        if(window.confirm("Voulez-vous supprimer le post ?")){
            fetch("http://localhost:3300/api/posts/"+value.id,{method:"DELETE"})
            .then(response=>response.json())
            .then(data=>{
                if(data.error)throw data;
                alert("Post supprimé avec succès");
                window.location.reload();
            })
            .catch(error=>{
                alert(JSON.stringify(error));
                navigate("/final2/posts/"+id,{replace:true});
            })
        }
    }

    useEffect(()=>{
        setUser(allUsers.filter((user)=>user.id === value.UserId)[0]);
    },[])

    useEffect(()=>{
        setComments(allComments.filter((comment)=>comment.PostId === value.id));
    },[])

    useEffect(()=>{
        if(!user && !sessionStorage.getItem("user"))navigate("/");
    },[user])

    return (<div className='post w-[90%] sm:max-w-[50%] sm:w-[30%] min-h-[100px] capitalize bg-neutral-700 p-4 rounded-lg flex flex-col gap-5 items-center'>
        <p>{value.texte}</p>
        <img alt='' src={value.image}/>
        <div className="comments w-full flex flex-col gap-4 overflow-x-hidden overflow-y-auto max-h-[100px] h-full">
            {concernedComments.map((comment,idx)=><CommentMain key={comment.id} id={idx} value={comment} allUsers={allUsers}/>)}
        </div>
        <div className="buttons">
            <Link to={"/final2/edit/"+JSON.parse(sessionStorage.getItem("user")).id+"/"+value.id}><button className='bg-blue-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white text-xl'>Modifier</button></Link>
            <button onClick={deleteSelf} className='bg-red-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white text-xl'>Supprimer</button>
        </div>
    </div>);
}

export default PostList;