import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {isExpired} from "react-jwt";
import './new-post.css';
const re = /(?:\.([^.]+))?$/;

function NewPost({setGlobalUser}) {

    const [user,setUser] = useState({id:0,username:"",email:"",password:"",admin:0})
    const [imageLink,setLink] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();
    const imageRef = useRef(null);

    /**
     * 
     * @param {import('react').BaseSyntheticEvent} event 
     */
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData.entries());
        if(entries.image.length > 255){
            alert("Image link too long");
            return;
        }
        entries.UserId = parseInt(id);
        
        fetch("http://localhost:3300/api/posts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entries)})
        .then(response=>response.json())
        .then(data=>{
            if(data.error)throw data;
            alert("Post posté avec succès");
            navigate("/final2/main/"+id);
        })
        .catch(error=>{
            alert(JSON.stringify(error));
            navigate("/final2/add/"+id,{replace:true});
        })
    }

    const previewImage = (evt) =>{
        const newSrc = document.getElementById("imageInput").value;
        const extension = re.exec(newSrc)[1];
        if(extension === "gif"){setLink(newSrc)}
        else setLink("");
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

    return (<main className='new-post w-full sm:pt-[10%] pt-[250px] flex flex-col gap-[30px] items-center justify-start pb-[100px]'>
        <h1 className='text-5xl'>Ajouter un nouveau post</h1>
        <form action="" onSubmit={handleSubmit} className='flex flex-col gap-5 items-center'>
            <div className="input-group">
                <label htmlFor="texte">Nouveau texte</label>
                <textarea name="texte" id="texte" required placeholder='Ecrire commentaire'></textarea>
            </div>
            <div className="input-group">
                <label htmlFor="imageInput">Nouvelle image</label>
                <input type="text" name='image' id='imageInput' placeholder='Lien URL image' className='w-4/5' />
            </div>
            <button type='button' onClick={previewImage} className='bg-cyan-500 w-fit p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Aperçu image</button>
            <img ref={imageRef} src={imageLink} className='max-w-[80%] h-auto'/>
            <button type='submit' className='bg-green-500 w-fit p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Envoyer</button>
        </form>
    </main>);
}

export default NewPost;