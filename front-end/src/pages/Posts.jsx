import React,{memo,useEffect,useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import styled from "styled-components";
import {useHistory} from "react-router-dom"
import {requestPostPaginator,requestPost,selectPost} from "../reducers/posts";
import {PostItem,Paginator} from "../components"

const Container = styled.div`
    height:calc(100vh - 270px)!important;
    overflow:scroll;
    padding:0 .5rem!important;
`
const Posts = props=>{
    const dispatch = useDispatch()
    const history = useHistory()
    const {app:{isLogin},posts:{paginator,arrPost,isFetchingPosts,isFetchingPaginator,
        errorPosts, errorPaginator}} = useSelector(state=>state)

    const [nElem,setNElem]=useState(2)
    const [currentPage,setCurrentPage]=useState(0)


    useEffect(()=>{
        Promise.all([dispatch(requestPostPaginator({nElem:nElem})),dispatch(requestPost({indexStart:currentPage,nElem:nElem}))])
    },[])

    const _onClickComment=comment=>{
        dispatch(selectPost(comment))
        history.push(`/posts/${comment._id}/comment`)
    }

    const _onLinkClick=path=>{
        history.push(path)
    }

    const _onChangePage=(evt)=>{

        evt.stopPropagation()
        const cp =parseInt(evt.target.value)-1

        dispatch(requestPost({indexStart:cp,nElem:nElem})).then(result=>{
            setCurrentPage(cp)
        })

    }
    const _onChangeNElement=(n)=>{
        Promise.all([dispatch(requestPostPaginator({nElem:n})),dispatch(requestPost({indexStart:0,nElem:n}))])
        setCurrentPage(0)
        setNElem(n)
    }

    const render=()=>{
        if(errorPosts || errorPaginator)
            return (<div className="alert alert-danger mt-5 mx-3" role="alert">
                System error, please contact site admin.
            </div>)
        if(isFetchingPosts || isFetchingPaginator)
            return (<div className="spinner-border text-primary mt-5" role="status">
                <span className="sr-only">Loading...</span></div>)

        if(arrPost.length > 0)
            return  <div className="col-sm-12 col-md-10">
                <Paginator
                    cPage={currentPage+1}
                    nElem={nElem}
                    paginator={paginator}
                    handleOnClickBtn={_onChangePage}
                    onChangeNElement={_onChangeNElement}
                >
                    <Container>
                        {
                            arrPost.map((item,key)=>(<PostItem key={key} onLinkClick={_onLinkClick} isLogin={isLogin} item={item} onClickComment={_onClickComment}/>))
                        }
                    </Container>

                </Paginator>
            </div>

        return (<div className="mt-5">
            <h2>Be the first to post !!</h2></div>)

    }


    return <div className="container-fluid pt-3 containerHeight">

        <div className="row justify-content-center">
            {
                render()
            }
        </div>
    </div>
}

export default memo(Posts)
