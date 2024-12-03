import React, { useEffect } from 'react';
import "./home.css";
import { Link } from 'react-router-dom';

function Home({setUser}) {

    useEffect(()=>{
        sessionStorage.clear();
        setUser({});
    },[])

    return (<main className='home w-full sm:pt-[10%] pt-[70px] flex flex-col gap-[30px] items-center justify-start'>
        <h1 className='text-5xl'>The Social Experiment</h1>
        <div className="buttons">
            <Link to={"/final2/signup"}><button className='bg-green-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Inscription</button></Link>
            <Link to={"/final2/login"}><button className='bg-green-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Connexion</button></Link>
        </div>
    </main>);
}

export default Home;