import React from 'react'
import { useSelector } from 'react-redux'; 
import { toast } from 'react-toastify'; 
import { useDispatch } from 'react-redux';
import { removeFromPaste } from '../features/pasteSlice'; 
import 'react-toastify/dist/ReactToastify.css'; 
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import './Paste.css'; 

import { useNavigate } from 'react-router-dom'; 
const Paste = () => {

    const allpastes = useSelector((state) => state.paste.pastes); 
    const dispatch = useDispatch();

    function handleDelete(pasteId) {
        dispatch(removeFromPaste(pasteId));
        
     
    }

    const navigate = useNavigate();

    function handleviewPaste(pasteId) {
        navigate(`/paste/${pasteId}`);
    }

    const [search, setsearch] = React.useState("");
    const filteredPastes = allpastes.filter(paste => 
        paste.title.toLowerCase().includes(search.toLowerCase()) || 
        paste.content.toLowerCase().includes(search.toLowerCase())
    );
    

    const [expandedPastes, setExpandedPastes] = useState({});
    const toggleExpanded = (id) => {
    setExpandedPastes((prev) => ({
        ...prev,
        [id]: !prev[id],
    }));
    };



    

   
    


  return (

    <div>
    <input type='text' className='search-bar' placeholder='Search pastes...' value={search} onChange={(e) => setsearch(e.target.value)} />
     <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800">
    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
    <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
  </div>
    <div className='all-pastes'>
   
        <h1 className='text-3xl font-bold mb-4'>All Pastes</h1>
        <div className>
            {allpastes.length > 0 ? (
            filteredPastes.map((paste) => (

                
                    <div key={paste.id} className='flex flex-row justify-between border p-4 mb-2'>
                        
                        <div className='content' >
                            <h2 className='text-4xl font-semibold mb-2'>{paste.title}</h2>
                            <p className='mb-2 text-left'>{expandedPastes[paste.id] || paste.content.length <= 100
                                ? paste.content
                                : `${paste.content.slice(0, 200)}...`}

                                {paste.content.length > 200 && (
                                <span
                                onClick={() => toggleExpanded(paste.id)}
                                className="ml-2 text-blue-400 underline cursor-pointer"
                                >
                                {expandedPastes[paste.id] ? "Show less" : "Read more"}
                                </span>
                                
                                )}</p>
                           
                        </div>

                        <div className='left'>

                            <div className='all-buttons'>
                                <button className='button' onClick={() => {handleviewPaste(paste.id)}}> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>

                                </button>

                                <button className='button'
                                    onClick={() => {
                                        navigator.clipboard.writeText(paste.content)
                                        .then(() => {
                                            toast.success("Content copied to clipboard!");
                                        })
                                        .catch((err) => {
                                            toast.error("Failed to copy content: " + err);
                                        });
                                    }}
                                    >
                                        <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                                        </svg>

                                    
                                </button>

                                <button className='button' onClick={() => handleDelete(paste.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>

                                </button>


                                <button className='button'
                                onClick={() => navigate(`/?pasteId=${paste.id}`)}
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                </svg>

                                </button>

                                <button className='button' >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                    </svg>

                                </button>
                                


                            </div>
                            <div className='date'>
                                    <p className='text-sm text-gray-500'>Created on: {new Date(paste.createDate).toLocaleString()}</p>
                                </div>

                        </div>


                     


                    </div>
             

            ))
            ) : (
            <p>No pastes available. Create a new paste!</p>
            )}
        </div>
        </div>

      
    </div>
  )
}

export default Paste
