import React, { useEffect, useState } from 'react';

function CommentMain({id,value,allUsers}) {

    const [user,setUser] = useState({});

    useEffect(()=>{
        setUser(allUsers.filter((currentUser)=>currentUser.id === value.UserId)[0]);
    },[])

    return (<div className='comment h-fit w-full bg-white text-black rounded-lg'>
        <h3 className='text-[0.8rem]'>{user.username}</h3>
        <p>{value.value}</p>
    </div>);
}

export default CommentMain;