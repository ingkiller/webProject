import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {API_URL} from "../communs/variables";
import docCookies from "../communs/cookie";

const onLogin = createAsyncThunk('ON_LOGIN',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {email,pass}=arg
            let res = await fetch(API_URL+'/auth/login',{
                method:'POST',
                body:JSON.stringify({email,pass}),
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json'
                }
            })
            if(res.status === 200)
                return await res.json()
            return rejectWithValue({error:true,errorCode:res.status})
        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })
const init = createAsyncThunk('ON_INIT',
    async (arg,{getState,rejectWithValue})=>{
        try {
            let isLogin = false
            if(sessionStorage.getItem('isLogin') !== null){
                isLogin=true
            }

            let user = {}
            if(sessionStorage.getItem('user') !== "undefined"){
                user = JSON.parse(sessionStorage.getItem('user'))
            }

            let token = docCookies.getItem('token')

            return {isLogin:isLogin,user,token}
        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })
const onSignUp = createAsyncThunk('ON_SING_UP',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {name,email,pass,about}=arg
            let res = await fetch(API_URL+'/auth/signup',{
                method:'POST',
                body:JSON.stringify({name,email,pass,about}),
                headers:{
                    Accept:'application/json',
                    'Content-type':'application/json'
                }
            })
            if(res.status === 200)
                return await res.json()
            return rejectWithValue({error:true,errorCode:res.status})
        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })
const updateUserProfile = createAsyncThunk('UPDATE_USER_PROFILE',
    async (arg,{getState,rejectWithValue})=>{
        try {

            const {token}=getState().app
            const {email,name,about}=arg

            let res = await fetch(API_URL+'/user/update-profile',{
                method:'Post',
                body:JSON.stringify({email,name,about}),
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

const userChangePass = createAsyncThunk('CHANGE_PASS',
    async (arg,{getState,rejectWithValue})=>{
        try {

            const {token}=getState().app
            const {oldPass,newPass}=arg
            let res = await fetch(API_URL+'/user/change-pass',{
                method:'Post',
                body:JSON.stringify({oldPass,newPass}),
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

const appSlice = createSlice({
    name: 'app',
    initialState: {
        user:{},
        token:"",
        isLogin:false,
        errorLogin:false,
        isFetchingUser:false,
        changePass:null,
        isInit:false
    },
    reducers: {
        onLogOut(state,action){
            sessionStorage.clear()
            localStorage.clear()
            docCookies.removeItem('token')
            state.user ={}
            state.token=""
            state.isLogin=false
            state.errorLogin=false
        }
    },
    extraReducers:{
        [init.pending]:state=>{
            state.isInit=true
        },
        [init.fulfilled]:(state,action)=>{
            state.isInit=false
            state.isLogin = action.payload.isLogin
            state.user = action.payload.user
            state.token = action.payload.token
        },
        [onLogin.pending]:state=>{
            state.isFetchingUser = true
            state.errorLogin=false
        },
        [onLogin.fulfilled]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=false
            sessionStorage.clear()
            localStorage.clear()

            sessionStorage.setItem('isLogin', 'true');
            sessionStorage.setItem('user',JSON.stringify(action.payload._user))
            docCookies.setItem('token',action.payload.token,'86400')

            state.user = action.payload._user
            state.token=action.payload.token
            state.isLogin=true
        },
        [onLogin.rejected]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=action.payload
        },
        [onSignUp.pending]:state=>{
            state.isFetchingUser = true
            state.errorLogin=false
        },
        [onSignUp.fulfilled]:(state,action)=>{

            sessionStorage.clear()
            localStorage.clear()

            sessionStorage.setItem('isLogin', 'true');
            sessionStorage.setItem('user',JSON.stringify(action.payload._user))
            docCookies.setItem('token',action.payload.token,'86400')


            state.isLogin=true
            state.isFetchingUser = false
            state.errorLogin=false
            state.token=action.payload.token
            state.user=action.payload._user

        },
        [onSignUp.rejected]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=action.payload
        },
        [updateUserProfile.pending]:state=>{
            state.isFetchingUser = true
            state.errorLogin=false
        },
        [updateUserProfile.fulfilled]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=false
            console.log('updateUserProfile:',action.payload)
            state.user=action.payload.user
            state.token=action.payload.token
        },
        [updateUserProfile.rejected]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=action.payload
        },
        [userChangePass.pending]:state=>{
            state.isFetchingUser = true
            state.errorLogin=false
        },
        [userChangePass.fulfilled]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=false

            state.changePass = action.payload
        },
        [userChangePass.rejected]:(state,action)=>{
            state.isFetchingUser = false
            state.errorLogin=action.payload
        }
    }

})

export const { onLogOut } = appSlice.actions
export {onLogin,onSignUp,updateUserProfile,userChangePass,init}
export default appSlice.reducer
