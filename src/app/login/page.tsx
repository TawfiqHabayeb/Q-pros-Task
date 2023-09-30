"use client";
import Link from "next/link";
import React from "react";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import axios  from "axios"
import toast from "react-hot-toast/headless";


export default function LoginPage (){
    const router = useRouter();
    const[user,setUSer] = React.useState({
        email: "",
        password: "",
 
        
    });
    
    const [buttonDisabled,setButtonDisabled] = useState(false);

    const[loading,setLoading] = useState(false);
   
   
    const onLogin = async() =>{
        try {
            setLoading(true);
            const response = await axios.post("api/users/login",user);
            console.log("Login Success",response.data)
            toast.success("Login Success");
            router.push("/profile")



        } catch (error:any) {
            console.log("Login failed ", error.message)
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
        };
        useEffect(()=>{

            if(user.email.length > 0  && user.password.length > 0){
                setButtonDisabled(false)
             } else{
                setButtonDisabled(true);
             }
    
    
         },[user])
    





return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2  ">
        <h1 className="m-2 border border-blue-600 rounded-lg p-3">{ loading ? "proccessing" : "Login"}</h1>
        <hr/>

    
       
           <label htmlFor="username" className="m-2"> email</label>
         <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-600 m-2 text-black"
            id="email"
            type="text"
            value={user.email}
            onChange={(e) =>setUSer( {
                ...user,email: e.target.value 
            })}
            placeholder="email"
        
        />
         <label htmlFor="username" className="m-2"> password</label>

         <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-600 text-black"
            id="password"
            type="text"
            value={user.password}
            onChange={(e) =>setUSer( {
                ...user,password: e.target.value 
            })}
            placeholder="password"
        
        />
        <button onClick={onLogin} className="p-2  border border-green-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600 m-2 "> 
            Login here
        </button>
        <Link href={"/signup"} > Visit SignUp Page</Link>
    </div>
)
}