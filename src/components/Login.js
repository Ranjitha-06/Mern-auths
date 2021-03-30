import React,{useState} from 'react';
import {Link ,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import GoogleLogin from 'react-google-login';
import emailjs from 'emailjs-com';



const Login=()=>{
    var [name,setName]=useState("");
    var [password,setPassword]=useState("");
    var [email,setEmail]=useState("");
    const history=useHistory();
    
    const saveData=(e,p,n)=>{
        console.log(e);
        name=n;
        email=e;
        password=p;
        fetch("https://mern-auths.herokuapp.com/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password,
                name
            })

        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                   history.push("/home");
                   sendEmail(data);
               }
            else{
                history.push("/home");
                sendEmail(data);
                console.log(data);
            }
        }).catch(err=>console.log(err));
    }
    
    const postData=()=>{
      
        fetch("https://mern-auths.herokuapp.com/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email,
                password
                
            })

        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
            M.toast({html: data.error,classes:"#ef5350 red lighten-1"})
           }
           else{
               history.push('/home');
               sendEmail(data);
           }
           
        }).catch(err=>console.log(err));
    }
    const responseGoogle=(response)=>{
        saveData(response?.profileObj.email,response?.profileObj.googleId,response?.profileObj.givenName);


        

    }
    const sendEmail=(e)=>{ 

        emailjs.init("user_FsqPKvkHjBEBYDClQ6iVa");
        emailjs.send('my_gmail', 'my_template',{ from_name: "sweety0132@gmail.com", message: "hello user!!", to_name:name ,reply_to: email })
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text,email);
    }, function(error) {
       console.log('FAILED...', error);
    });

    }    

    return(

        <div>
            <div className="card auth-card input-field">
                <h3>Hello user!</h3>
                <GoogleLogin
                    clientId="710233140079-ae0sj46hodneagkh3s3qh24ut03oeh5t.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <input  type="text" placeholder="enter your email  " value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} /> 
                
                <button className="btn waves-effect waves-light #ec407a pink lighten-1" onClick={()=>postData()}>Login</button>
                <p>Dont have an account ?<Link to="/SignUp" id="link">SignUp</Link></p>
            </div>
        </div>
    )
}
export default Login;