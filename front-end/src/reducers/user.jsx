import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {API_URL} from "../communs/variables";

const requestUserProfile = createAsyncThunk('REQUEST_USER_PROFILE',
    async (arg,{getState,rejectWithValue})=>{
        try {

            const {token}=getState().app

            let res = await fetch(API_URL+'/user/info',{
                method:'Post',
                body:JSON.stringify({userId:arg.userId}),
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(res.status === 200)
                return await res.json()
            return rejectWithValue({error:true,errorCode:res.status})
        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }
    })


const userSlice = createSlice({
    name: 'user',
    initialState: {
        data:[],
        errorUser:false,
        isFetchingUser:false,
    },
    reducers: {
    },
    extraReducers:{
        [requestUserProfile.pending]:(state)=>{
            state.isFetchingUser=true
            state.errorUser = false
        },
        [requestUserProfile.fulfilled]:(state,action)=>{
            state.isFetchingUser=false
            state.errorUser = false
            state.data = action.payload
        },
        [requestUserProfile.rejected]:(state,action)=>{
            state.isFetchingUser=false
            state.errorUser = action.payload
        }
    }
})
export {requestUserProfile}
export default userSlice.reducer
