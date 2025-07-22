import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers: {
        addItem:(state,action)=>{
            //mutating state
            //Redux toolkit uses Immer BTS
             state.items.push(action.payload)
        },
        removeItem:(state)=>{
            state.items.pop()
       },
       clearItem:(state)=>{
        //can't do this state=[]

        console.log(current(state))

        state.items.length =0;// state=[]
           //or 
        //RTK - either mutate the state or return new stATE // return {items : []};
   },

    }
})

export const {addItem,removeItem,clearItem} = cartSlice.actions

export default cartSlice.reducer;