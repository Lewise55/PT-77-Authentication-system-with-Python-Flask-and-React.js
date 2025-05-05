import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const { store, dispatch, getUser} = useGlobalReducer()
    const [message, setMessage] = useState("")
    const navigate = useNavigate();
    
    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if(token && !store.user) {
            getUser(token)
        }
    }, [store.access_token])

    useEffect(() => {
        if(store?.user == null) {
            setMessage("YOU MUST LOGIN FIRST")
        } 
        else {
            setMessage(`Hello ${store.user.email}`)
        }
    }, [])

    const handleLogout = () => {
        sessionStorage.removeItem('access_token');

        dispatch({
            type: "set_user",
            payload: { user: null, access_token: null },
        });

        navigate("/login");
    }

    return (
        <div className="text-center mt-5">
            <div>{message}</div>            
            <button 
                onClick={handleLogout} 
                className="btn btn-danger mt-3">
                    Log Out
            </button>
        </div>
        
    );
}; 