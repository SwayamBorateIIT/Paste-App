import { createSlice } from '@reduxjs/toolkit'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
    pastes:localStorage.getItem('pastes') ? JSON.parse(localStorage.getItem('pastes')) : []
}



export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPaste: (state, action) => {
      const newPaste = action.payload;
      
      state.pastes.push(newPaste);
      localStorage.setItem('pastes', JSON.stringify(state.pastes));
      toast("Paste added successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      


    
    },
    updateToPaste: (state, action) => {
      const newPaste = action.payload;
      console.log(newPaste);
      const pasteIndex = state.pastes.findIndex(paste => paste.id === newPaste.id);
      if (pasteIndex !== -1) {
        state.pastes[pasteIndex] = newPaste;
    
        toast.success("Paste updated successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Paste not found for update!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      
        
    
    },
    resetAllPaste: (state, action) => {
  
    },
    removeFromPaste: (state, action) => {
      const pasteId = action.payload;
      for(let i = 0; i < state.pastes.length; i++) {
        if(state.pastes[i].id === pasteId) {
          state.pastes.splice(i, 1);
          localStorage.setItem('pastes', JSON.stringify(state.pastes));
          toast.success("Paste deleted successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          break;

          
        }
      }


    }
  },
})

// Action creators are generated for each case reducer function
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } = pasteSlice.actions

export default pasteSlice.reducer