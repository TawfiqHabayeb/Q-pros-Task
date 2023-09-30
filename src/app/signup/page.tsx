"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios"
import toast from "react-hot-toast";


export default function SignupPage (){
    const router = useRouter();

    const[user,setUSer] = useState({
        email: "",
        password: "",
        username:"",

    })

    const [buttonDisabled,setButtonDisabled] = useState(false);

    const[loading,setLoading] = useState(false);



    const onSignup = async () => {
        try {
          setLoading(true);
          const response = await axios.post("/api/users/signup", user);
      
          if (response.status === 200) {
            console.log("Signup success", response.data);
            router.push("/login");
          } else {
            console.log("Signup failed with status:", response.status);
          }
        } catch (error: any) {
          toast.error(error.message);
          console.error("Signup failed", error);
        } finally {
          setLoading(false);
        }
      };
      
useEffect(()=>{
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
        setButtonDisabled(false)
    } else {
            setButtonDisabled(true);
        }

},[user])


return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <h1 className="m-2 border border-blue-600 rounded-lg p-3"> { loading ? "Proccessing" : "Signup"}</h1>
        <hr/>

        <label htmlFor="username" className="m-2"> username</label>
        <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 m-2 text-black"
            id="username"
            type="text"
            value={user.username}
            onChange={(e) =>setUSer( {
                ...user,username: e.target.value 
            })}
            placeholder="username"
        
        />
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

         <input className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus-border-gray-600 m-2 text-black"
            id="password"
            type="text"
            value={user.password}
            onChange={(e) =>setUSer( {
                ...user,password: e.target.value 
            })}
            placeholder="password"
        
        />
        <button onClick={onSignup} className="p-2  border border-green-500 rounded-lg mb-4 focus:outline-none 
        focus:border-gray-600 m-2"> 
           {buttonDisabled ? " No signup " : " Signup "}
        </button>
        <Link href={"/login"}  className="m-2"> Visit Login Page</Link>
    </div>
)
}