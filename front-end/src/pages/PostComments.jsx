import React, {memo, useEffect, useState,useCallback} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useParams,useHistory} from 'react-router-dom'
import {CommentAddForm, CommentItem,PostCard} from '../components'
import {addNewComment,getCommentByPost} from "../reducers/posts";

const PostComments = props=>{

    const {app:{isLogin},posts:{selectedPost,isFetchingComment,isSavingComment,
        errorFetchingComment,
        errorSavingComment,
        arrComment}} = useSelector(state=>state)
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [commentArr,setCommentArr]=useState([])

    useEffect(()=>{
        let postId = selectedPost._id || params.id
        if(selectedPost._id === undefined)
            history.push('/posts')
        dispatch(getCommentByPost({postId:postId}))
    },[])

    useEffect(()=>{
        setCommentArr(arrComment)
    },[arrComment])

    const _onAddComment=useCallback((comment)=>{
        dispatch(addNewComment({postId:selectedPost._id,content:comment}))
    },[])

    const _onLinkClick=path=>{
        history.push(path)
    }

    const render=()=>{
        if(errorFetchingComment)
            return (<div className="alert alert-danger mt-5 mx-3" role="alert">
                System error, please contact site admin.
            </div>)
        if(isFetchingComment)
            return (<div className="row d-flex justify-content-center">
                    <div className="spinner-border text-primary mt-5" role="status">
                        <span className="sr-only">Loading...</span></div>
                </div>
                )
        if(arrComment.length === 0)
            return (<div className="alert alert-info mt-5 mx-3" role="alert">
                This Post has no comments yet, be the first!
            </div>)
        return  [...commentArr].map((item,key)=>(<CommentItem onLinkClick={_onLinkClick} key={key} item={item} />))

    }

    return <div className="container-fluid pt-3 containerHeight">
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-4">
                {
                    selectedPost._id !== undefined && <PostCard onLinkClick={_onLinkClick}  item={selectedPost} />
                }
            </div>
            <div className="col-sm-12 col-md-8">
                {
                    isLogin && <CommentAddForm errorSaving={errorSavingComment} isSaving={isSavingComment}   addComment={_onAddComment}/>
                }

                {
                   render()
                }
            </div>
        </div>
    </div>
}

export default memo(PostComments)
