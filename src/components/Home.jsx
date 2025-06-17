import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { addToPaste, updateToPaste } from '../features/pasteSlice';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux'; 
import { useEffect } from 'react';


const Home = () => {

    const [title, setTitle] = React.useState("");
    const [searchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");

   
    const navigate = useNavigate();
    
    


    const [content, setContent] = React.useState("");

    const dispatch = useDispatch();

    const existingPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {
        if (pasteId) {
            const paste = existingPastes.find(p => p.id === pasteId);
            if (paste) {
                setTitle(paste.title);
                setContent(paste.content);
            } else {
                toast.error("Paste not found!");
                setTitle("");
                setContent("");
            }
        } 
    }
    , [pasteId, existingPastes]);

    function updatePaste(pasteId)  {
        const pasteData = {
            title: title,
            content: content,
            id: pasteId || Date.now().toString(),
            createDate: new Date().toISOString()
        };
        dispatch(updateToPaste(pasteData));
        navigate("/");
        setTitle("");
        setContent("");
        



    }

   

    function createpaste() {
        if (title.trim() === "" || content.trim() === "") {
            alert("Title and content cannot be empty");
            return;
        }
        const duplicate = existingPastes.find(p => p.title === title.trim());
        if (duplicate) {
            toast.error("A paste with this title already exists!");
            return; 
        }
        const pasteData = {
            title: title,
            content: content,
            id: pasteId || Date.now().toString(),
            createDate: new Date().toISOString()
        };
        dispatch(addToPaste(pasteData));
        setTitle("");
        setContent("");
    }

    

   
  return (
    <div className='p-2'>
        <div>

       
        <input type="text" value = {title} 
        onChange = {(e)=> setTitle(e.target.value)}
        placeholder="Enter the title here" 
        className="w-120 p-2 border border-gray-300 rounded-md mb-4 mt-4 bg-black" />


       
        {pasteId ? (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4" onClick = {() =>updatePaste(pasteId)}>
                
                Update Paste
            </button>
            ) : (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 ml-4" onClick ={() => createpaste()}>
                Create Paste
            </button>
        )}

        </div>
       
        <div className='mt-4 w-[900px] mx-auto'>
   
        <div className="flex items-center space-x-2 p-2 px-4 bg-gray-800 rounded-t-md">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>


        <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[300px] p-4 border-t-0 border border-gray-700 rounded-b-md bg-[#1f1f1f] text-white placeholder-gray-400 resize-none"
            placeholder="Write your content here..."
        ></textarea>
        </div>





        
       
    </div>
  )
}

export default Home
