import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {API_URL} from "../communs/variables";


const requestStats = createAsyncThunk('REQUEST_STATS',
    async (arg,{getState,rejectWithValue})=>{
        try {

            const {token}=getState().app
            let res = await fetch(API_URL+'/post/stats',{
                method:'GET',
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


const statsSlice = createSlice({
    name: 'stats',
    initialState: {
        barData:[],
        pieData:[],
        errorStats:false,
        isFetchingStats:false,
    },
    reducers: {

    },
    extraReducers:{
        [requestStats.pending]:(state)=>{
            state.isFetchingStats=true
            state.errorStats = false
        },
        [requestStats.fulfilled]:(state,action)=>{
            state.isFetchingStats=false
            state.errorStats = false

            let result = action.payload
            let bHead=[' '],bData=['Totals'],bfinal = [],pfinal=[['Category','Total']]


            for(let i=0;i<result.length;i++){
                bHead.push(result[i]._id)
                bData.push(result[i].total)
                pfinal.push([result[i]._id,result[i].total])

            }
            bfinal.push(bHead)
            bfinal.push(bData)
            state.barData=bfinal
            state.pieData=pfinal
        },
        [requestStats.rejected]:(state,action)=>{
            state.isFetchingStats=false
            state.errorStats = action.payload
        }
    }

})
export {requestStats}
export default statsSlice.reducer
