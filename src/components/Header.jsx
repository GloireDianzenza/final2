import React from 'react';
import "./header.css";
import { Link } from 'react-router-dom';

function Header({user}) {
    return (<header className='w-full flex sm:flex-row min-h-fit flex-col sm:min-h-[10%] sm:h-[10%] justify-between items-center fixed left-0 top-0 bg-neutral-500 px-4'>
        <div className="left">
            {user.id && <Link to={"/"}><button className='bg-red-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Désinscription</button></Link>}
        </div>
        <div className="center">
            <h1 className='text-3xl'>The Social Experiment</h1>
        </div>
        <div className="right flex justify-between items-center w-full sm:w-fit gap-4">
            {user.id && <Link to={"/final2/add/"+JSON.parse(sessionStorage.getItem("user")).id}><button className='bg-green-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Ajouter un post</button></Link>}
            {user.id && user.admin === 0 && <Link to={"/final2/posts/"+JSON.parse(sessionStorage.getItem("user")).id}><button className='bg-orange-500 p-5 rounded-md hover:bg-transparent hover:border hover:border-white'>Voir vos posts</button></Link>}
        </div>
    </header>);
}

export default Header;