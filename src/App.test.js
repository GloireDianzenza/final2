import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe("User tests",()=>{
  it("gets all users",()=>{
    return fetch("http://localhost:3300/api/users").then(response=>response.json())
    .then(data=>{
      expect(data).not.toHaveLength(0)
    })
})
it("gets all admins",()=>{
    return fetch("http://localhost:3300/api/users/admin",{method:"POST"}).then(response=>response.json())
    .then(data=>{
      expect(data).not.toHaveLength(0)
    })
})
it("searches a specific user",()=>{
    return fetch("http://localhost:3300/api/users/1").then(response=>response.json())
    .then(data=>{
      expect(data.id).not.toBeUndefined();
    })
})
it("attempts to log in",()=>{
    return fetch("http://localhost:3300/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"admin",email:"ad@gmail.com",password:"0000"})}).then(response=>response.json())
    .then(data=>{
      expect(data.token).not.toBeUndefined();
    })
})
// it("adds a new user",()=>{
//     return fetch("http://localhost:3300/api/users",{
//       method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"delete",email:"delete@gmail.com",password:"1234"})
//     }).then(response=>response.json())
//     .then(data=>{
//       expect(data.error).toBeUndefined();
//     })
// })
// it("updates an existing user",()=>{
//     return fetch("http://localhost:3300/api/users/9",{
//       method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:"deleter",password:"0000"})
//     }).then(response=>response.json())
//     .then(data=>{
//       expect(data.error).toBeUndefined();
//     })
// })
// it("deletes an existing user",()=>{
//     return fetch("http://localhost:3300/api/users/9",{
//       method:"DELETE",headers:{"Content-Type":"application/json"}
//     }).then(response=>response.json())
//     .then(data=>{
//       expect(data.error).toBeUndefined();
//     })
// })
})

describe("Post tests",()=>{
    it("gets all posts",()=>{
      return fetch("http://localhost:3300/api/posts")
      .then(response=>response.json())
      .then(data=>expect(data).not.toHaveLength(0))
    })
    
    it("gets a specific posts",()=>{
      return fetch("http://localhost:3300/api/posts/3")
      .then(response=>response.json())
      .then(data=>expect(data.id).not.toBeUndefined())
    })
    
    // it("adds a new post",()=>{
    //   return fetch("http://localhost:3300/api/posts/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:1,texte:"hgsqjhdsgdhj"})})
    //   .then(response=>response.json())
    //   .then(data=>expect(data.error).toBeUndefined())
    // })
    it("gets posts submitted by a certain user",()=>{
      return fetch("http://localhost:3300/api/posts/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:1,texte:"hgsqjhdsgdhj"})})
      .then(response=>response.json())
      .then(data=>expect(data.error).toBeUndefined())
    })
    // it("updates an existing post",()=>{
    //   return fetch("http://localhost:3300/api/posts/6",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:1,texte:"to delete"})})
    //   .then(response=>response.json())
    //   .then(data=>expect(data.error).toBeUndefined())
    // })
    // it("deletes an existing post",()=>{
    //   return fetch("http://localhost:3300/api/posts/6",{method:"DELETE"})
    //   .then(response=>response.json())
    //   .then(data=>expect(data.error).toBeUndefined())
    // })
})

describe("Comment tests",()=>{
    it("gets all comments",()=>{
        return fetch("http://localhost:3300/api/comments").then(response=>response.json())
        .then(data=>expect(data).not.toHaveLength(0));
    })
    it("finds a certain comment by ID",()=>{
        return fetch("http://localhost:3300/api/comments/1").then(response=>response.json())
        .then(data=>expect(data.id).not.toBeUndefined());
    })
    // it("adds a comment",()=>{
    //     return fetch("http://localhost:3300/api/comments/",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:8,PostId:5,value:"jhgsdqhjsdgfhdskj"})}).then(response=>response.json())
    //     .then(data=>expect(data.error).toBeUndefined());
    // })
    it("gets all comments by a certain user",()=>{
        return fetch("http://localhost:3300/api/comments/user",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:1})}).then(response=>response.json())
        .then(data=>expect(data).not.toHaveLength(0));
    })
    it("gets all comments by a certain post",()=>{
        return fetch("http://localhost:3300/api/comments/post",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({PostId:3})}).then(response=>response.json())
        .then(data=>expect(data).not.toHaveLength(0));
    })
    // it("edits an existing comment",()=>{
    //     return fetch("http://localhost:3300/api/comments/4",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({UserId:8,PostId:5,value:"to delete"})}).then(response=>response.json())
    //     .then(data=>expect(data.error).toBeUndefined());
    // })
    // it("deletes an existing comment",()=>{
    //     return fetch("http://localhost:3300/api/comments/4",{method:"DELETE"}).then(response=>response.json())
    //     .then(data=>expect(data.error).toBeUndefined());
    // })
})