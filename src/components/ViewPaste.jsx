import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const ViewPaste = () => {


    const { id } = useParams();
    const allpastes = useSelector((state) => state.paste.pastes); 
    const paste = allpastes.find(p => p.id === id); 
    
  return (
    <div className="min-h-screen  text-white p-6 sm:p-10 mt-4">


   
      <h2 className="text-4xl font-semibold mb-4">Title: {paste.title}</h2>

 
      <div className="bg-[#2a2a2a] rounded shadow-md border border-gray-700 overflow-hidden">
    
        <div className="flex items-center space-x-2 p-2 px-4 border-b border-gray-700">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>

  
        <div className="relative">
          <pre className="whitespace-pre-wrap text-white p-4 bg-[#1f1f1f] min-h-[300px] text-left">
            {paste.content}
          </pre>
        </div>
      </div>

   
      <p className="text-gray-400 mt-4">
        Created on: {new Date(paste.createDate).toLocaleString()}
      </p>
    </div>
  )
}

export default ViewPaste
