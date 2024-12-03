import React from 'react';
import "./signup.css";
import { useNavigate } from 'react-router-dom';

function Login() {

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
            if(data.error)throw data;
            sessionStorage.setItem("token",data.token);
            sessionStorage.setItem("user",JSON.stringify(data.user));
            navigate("/final2/main/"+data.user.id);
        })
        .catch(error=>{alert(JSON.stringify(error))});
    }

    return (<main className='signup w-full sm:pt-[10%] pt-[70px] flex flex-col gap-[30px] items-center justify-start'>
        <h1 className='text-5xl'>Se connecter</h1>
        <form className='w-[80%] flex flex-col gap-[30px] items-center justify-start' onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Pseudo</label>
                <input type="text" name='username' id='username' placeholder='Pseudonyme' required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name='password' id='password' placeholder='Mot de passe' required />
            </div>
            <input type="submit" value="S'inscrire" className='text-[1.4rem] bg-cyan-700 hover:bg-transparent cursor-pointer p-4 rounded-lg'/>
        </form>
    </main>);
}

export default Login;