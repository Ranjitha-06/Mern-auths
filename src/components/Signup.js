import React ,{useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';

const SignUp=()=>{

    
    const [name,setName]=useState("");
    const[password,setPassword]=useState("");
    const[email,setEmail]=useState("");
    const history=useHistory();
    const postData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"invalid email",classes:"#ef5350 red lighten-1"});
            return;
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })

        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
           }
           else{
               M.toast({html:data.message,classes:"#66bb6a green lighten-1"})
               history.push("/");
           }
        }).catch(err=>console.log(err));
    }

    return(
        <div>
            <div className="card auth-card input-field">
                <h4>Register here!</h4>
                <input  type="text" placeholder="enter your name"  value={name} onChange={(e)=>setName(e.target.value)}/>
                <input  type="text" placeholder="enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="enter your email" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                
                <button className="btn waves-effect waves-light #ec407a pink lighten-1" onClick={()=>postData()}>Register</button>
                <p>Already Have an account?<Link to="/" id="link">Login</Link></p>
            </div>
        </div>
    )
}
export default SignUp;