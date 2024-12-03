import React, { useEffect, useState } from 'react';
import CommentMain from './CommentMain';
import { Link, useNavigate } from 'react-router-dom';

function PostMain({id,value,allUsers,allComments,currentUserId}) {

    const [user,setUser] = useState({});
    const [concernedComments,setComments] = useState([{}]);
    const navigate = useNavigate();

    useEffect(()=>{
       const currentUser = allUsers.filter(user=>user.id === value.UserId)[0];
       setUser(currentUser);
    },[])
    
    useEffect(()=>{
       setComments([]);
       if(allComments.length <= 1 || allComments[0].id == undefined)return;
       const comments = allComments.filter(comment=>comment.PostId.toString() === value.id.toString());
       setComments(comments);
    },[])

    useEffect(()=>{
        if(concernedComments.length <= 0)return;
        if(!concernedComments[0].id)return;
        if(!user.id)navigate("/");
    },[concernedComments])

    const deleteAdmin = () =>{
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
                navigate("/final2/main/"+id,{replace:true});
            })
        }
    }

    return (<div className='post w-[90%] sm:max-w-[50%] sm:w-[30%] min-h-[100px] capitalize bg-neutral-700 p-4 rounded-lg flex flex-col gap-5 items-center'>
        <h2>{user.username}</h2>
        <p>{value.texte}</p>
        <img alt='' src={value.image}/>
        <div className="comments w-full flex flex-col gap-4 overflow-x-hidden overflow-y-auto max-h-[100px] h-full">
            {concernedComments.map((comment,idx)=><CommentMain key={comment.id} id={idx} value={comment} allUsers={allUsers}/>)}
        </div>
        {allUsers.filter((user)=>user.admin === 0).filter((user)=>user.id == currentUserId).length > 0 ? 
        <Link to={"/final2/comment/"+currentUserId+"/"+value.id}><button className='bg-yellow-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Commenter</button></Link> : 
        <div className='buttons'>
                <Link to={"/final2/edit/"+JSON.parse(sessionStorage.getItem("user")).id+"/"+value.id}><button className='bg-blue-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white text-xl'>Modifier</button></Link>
                <button onClick={deleteAdmin} className='bg-red-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white text-xl'>Supprimer</button>
            </div>}
    </div>);
}

export default PostMain;