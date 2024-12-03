import React from 'react';
import "./signup.css";
import { useNavigate } from 'react-router-dom';

function Signup() {

    const navigate = useNavigate();

    /**
     * 
     * @param {import('react').BaseSyntheticEvent} event 
     */
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = Object.fromEntries(formData.entries());
        
        fetch("http://localhost:3300/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entries)})
        .then(response=>response.json())
        .then(data=>{
            if(!data.error)throw "User already exists";
            fetch("http://localhost:3300/api/users/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entries)})
            .then(response=>response.json())
            .then(data2=>{
                if(data2.error)throw data2;
                fetch("http://localhost:3300/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entries)})
                .then(response=>response.json())
                .then(data3=>{
                    if(data3.error)throw data3;
                    sessionStorage.setItem("user",JSON.stringify(data3.user));
                    sessionStorage.setItem("token",data3.token);

                    navigate("/final2/main/"+data3.user.id);
                })
            })
            .catch(error=>{throw error});
        })
        .catch(error=>{
            alert(JSON.stringify(error));
            navigate("/final2/signup",{replace:true});
        })
    }

    return (<main className='signup w-full sm:pt-[10%] pt-[70px] flex flex-col gap-[30px] items-center justify-start'>
        <h1 className='text-5xl'>S'inscrire</h1>
        <form className='w-[80%] flex flex-col gap-[30px] items-center justify-start' onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Pseudo</label>
                <input type="text" name='username' id='username' placeholder='Pseudonyme' required />
            </div>
            <div className="input-group">
                <label htmlFor="email">Adresse email</label>
                <input type="email" name='email' id='email' placeholder='Email' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name='password' id='password' placeholder='Mot de passe' required />
            </div>
            <input type="submit" value="S'inscrire" className='text-[1.4rem] bg-cyan-700 hover:bg-transparent cursor-pointer p-4 rounded-lg'/>
        </form>
    </main>);
}

export default Signup;