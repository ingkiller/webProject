import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {API_URL} from "../communs/variables";

const requestPostPaginator = createAsyncThunk('REQUEST_POST_PAGINATOR',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {nElem=10}=arg
            let res = await fetch(API_URL+'/post/paginator',{
                method:'POST',
                body:JSON.stringify({nElem}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if(res.status === 200)
                return await res.json()
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })

const requestPost = createAsyncThunk('REQUEST_POST',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {indexStart=0,nElem=10,orderField='date',order=-1}=arg
            let res = await fetch(API_URL+'/post/post-pagin',{
                method:'POST',
                body:JSON.stringify({indexStart,nElem,orderField,order}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if(res.status === 200)
                return await res.json()
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })
const addNewPost = createAsyncThunk('ADD_NEW_POST',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {title,category,content}=arg
            const {token,user}=getState().app
            let res = await fetch(API_URL+'/post/addPost',{
                method:'POST',
                body:JSON.stringify({title,category,content}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(res.status === 200){
                let post = await res.json()
                return {...post,user:user}
            }

            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })

const addNewComment = createAsyncThunk('ADD_NEW_COMMENT',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {postId,content}=arg
            const {token,user}=getState().app
            let res = await fetch(API_URL+'/post/comment/add',{
                method:'POST',
                body:JSON.stringify({postId,content}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(res.status === 200){
                let comment = await res.json()
                return {...comment,user:user}
            }
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })

const getCommentByPost = createAsyncThunk('GET_COMMENT_BY_POST',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {postId}=arg
            const {token}=getState().app
            let res = await fetch(API_URL+'/post/comment/get-by-post',{
                method:'POST',
                body:JSON.stringify({postId}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            if(res.status === 200){
                return await res.json()
            }
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })

const requestPostFilter = createAsyncThunk('REQUEST_POST_FILTER',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {filter,indexStart,nElem}=arg
            let res = await fetch(API_URL+'/post/filter',{
                method:'POST',
                body:JSON.stringify({filter,indexStart,nElem}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if(res.status === 200)
                return await res.json()
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })

const requestPostFilterPagin = createAsyncThunk('REQUEST_POST_FILTER_PAGIN',
    async (arg,{getState,rejectWithValue})=>{
        try {
            const {filter,nElem}=arg
            let res = await fetch(API_URL+'/post/filter-paginator',{
                method:'POST',
                body:JSON.stringify({filter,nElem}),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            if(res.status === 200)
                return await res.json()
            return  rejectWithValue({error:true,errorCode:res.status})

        }catch (e) {
            return rejectWithValue({error:true,errorCode:900,errorDesc:e})
        }

    })



const appSlice = createSlice({
    name: 'posts',
    initialState: {
        isFetchingPosts:false,
        errorPosts:false,
        isFetchingPaginator:false,
        errorPaginator:false,
        arrPost:[],
        isSaving:false,
        selectedPost:false,
        paginator:{pages:0,nElem:0,total:0},

        isFetchingComment:false,
        errorFetchingComment:false,
        isSavingComment:false,
        errorSavingComment:false,
        arrComment:[],

        arrPostSearch:[],
        isFetchingSearch:false,
        isFetchingSearchPaginator:false,
        searchPaginator:{pages:0,nElem:0,total:0},
        errorSearchFilter:false,
        errorSearchPagin:false,

    },
    reducers: {
        selectPost(state,action){
            state.selectedPost = action.payload
        }
    },
    extraReducers:{
        [requestPost.pending]:state=>{
            state.isFetchingPosts=true
            state.errorPosts=false
        },
        [requestPost.fulfilled]:(state,action)=>{
            state.isFetchingPosts=false
            state.errorPosts=false
            state.arrPost = action.payload
        },
        [requestPost.rejected]:(state,action)=>{
            state.isFetchingPosts=false
            state.errorPosts = action.payload
        },
        [addNewPost.pending]:state=>{
            state.isSaving = true
            state.errorPosts=false
        },
        [addNewPost.fulfilled]:(state,action)=>{
            state.isSaving = false
            state.errorPosts=false
            state.arrPost.unshift(action.payload)
        },
        [addNewPost.pending]:(state,action)=>{
            state.isSaving = false
            state.errorPosts=action.payload
        },
        [addNewComment.pending]:(state)=>{
            state.isSavingComment = true
            state.errorSavingComment=false
        },
        [addNewComment.fulfilled]:(state,action)=>{
            state.isSavingComment = false
            state.errorSavingComment=false
            state.arrComment.unshift(action.payload)
        },
        [addNewComment.rejected]:(state,action)=>{
            state.isSavingComment = false
            state.errorSavingComment=action.payload
        },
        [getCommentByPost.pending]:(state)=>{
            state.isFetchingComment = true
            state.errorFetchingComment=false
        },
        [getCommentByPost.fulfilled]:(state,action)=>{
            state.isFetchingComment = false
            state.errorFetchingComment=false
            state.arrComment=action.payload
        },
        [getCommentByPost.rejected]:(state,action)=>{
            state.isFetchingComment = false
            state.errorFetchingComment=action.payload
        },
        [requestPostPaginator.pending]:state=>{
            state.isFetchingPaginator=true
            state.errorPaginator=false
        },
        [requestPostPaginator.fulfilled]:(state,action)=>{
            state.isFetchingPaginator=false
            state.errorPaginator=false
            state.paginator=action.payload
        },
        [requestPostPaginator.rejected]:(state,action)=>{
            state.isFetchingPaginator=false
            state.errorPaginator=action.payload
        },
        [requestPostFilter.pending]:state=>{
            state.isFetchingSearch=true
            state.errorSearchFilter=false
        },
        [requestPostFilter.fulfilled]:(state,action)=>{
            state.isFetchingSearch=false
            state.errorSearchFilter=false
            state.arrPostSearch = action.payload
        },
        [requestPostFilter.rejected]:(state,action)=>{
            state.isFetchingSearch=false
            state.errorSearchFilter=action.payload

        },
        [requestPostFilterPagin.pending]:state=>{
            state.isFetchingSearchPaginator=true
            state.errorSearchPagin=false
        },
        [requestPostFilterPagin.fulfilled]:(state,action)=>{
            state.isFetchingSearchPaginator=false
            state.errorSearchPagin=false
            state.searchPaginator = action.payload
        },
        [requestPostFilterPagin.rejected]:(state,action)=>{
            state.isFetchingSearchPaginator=false
            state.errorSearchPagin=action.payload

        }
    }
})

export const { selectPost } = appSlice.actions
export {requestPost,addNewPost,addNewComment,getCommentByPost,requestPostPaginator,requestPostFilter,
    requestPostFilterPagin}
export default appSlice.reducer
