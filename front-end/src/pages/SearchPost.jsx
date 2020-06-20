import React, {memo, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useHistory} from "react-router-dom"
import styled from "styled-components";
import {SearchBar, PostItem, Paginator} from "../components"
import {
    requestPostFilter,
    selectPost,
    requestPostFilterPagin
} from "../reducers/posts";

const Container = styled.div`
    height:calc(100vh - 300px)!important;
    overflow:scroll;
    padding:0 .5rem!important;
`

const SearchPost = props=>{
    const dispatch = useDispatch()
    const history = useHistory()

    const [filter,setFilter]=useState("")
    const [nElem,setNElem]=useState(2)
    const [currentPage,setCurrentPage]=useState(0)

    const {app:{isLogin},posts:{isFetchingSearch,isFetchingSearchPaginator,arrPostSearch,searchPaginator,errorSearchFilter,
        errorSearchPagin}}=useSelector(state=>state)
    const onFilter=value=>{
        setFilter(value)
        Promise.allSettled([dispatch(requestPostFilterPagin({filter:value,nElem:nElem})), dispatch(requestPostFilter({filter:value,indexStart:0,nElem:nElem}))])
    }

    const _onChangePage=(evt)=>{
        evt.stopPropagation()
        const cp =parseInt(evt.target.value)-1
        dispatch(requestPostFilter({filter:filter,indexStart:cp,nElem:nElem})).then(()=>{
            setCurrentPage(cp)
        })

    }
    const _onChangeNElement=(n)=>{
        Promise.allSettled([dispatch(requestPostFilterPagin({filter:filter,nElem:n})), dispatch(requestPostFilter({filter:filter,indexStart:0,nElem:n}))])
        setCurrentPage(0)
        setNElem(n)
    }

    const _onClickComment=comment=>{
        dispatch(selectPost(comment))
        history.push(`/posts/${comment._id}/comment`)
    }

    const _onLinkClick=path=>{
        history.push(path)
    }
    const render=()=>{
        if(errorSearchFilter || errorSearchPagin)
            return (<div className="alert alert-danger mt-5 mx-3" role="alert">
                System error, please contact site admin.
            </div>)
        if(isFetchingSearch || isFetchingSearchPaginator)
            return (<div className="spinner-border text-primary mt-5" role="status">
                <span className="sr-only">Loading...</span></div>)
        if(filter !== "" && arrPostSearch.length > 0)
            return <div className="col-sm-12 col-md-10">
            <Paginator
                cPage={currentPage+1}
                nElem={nElem}
                paginator={searchPaginator}
                handleOnClickBtn={_onChangePage}
                onChangeNElement={_onChangeNElement}
            >
                <Container>
                    {
                        [...arrPostSearch].map((item,key)=>(<PostItem key={key} onLinkClick={_onLinkClick} isLogin={isLogin} item={item} onClickComment={_onClickComment}/>))
                    }
                </Container>
            </Paginator>
        </div>
        if(filter !== "" && arrPostSearch.length === 0)
            return  (<div className="alert alert-info mt-5 mx-3" role="alert">
                No data found
            </div>)
        return (<div className="mt-5">
            <h5>Search's result will be displayed here.</h5></div>)

    }
    return <div className="container-fluid pt-3 containerHeight">
        <div className="row justify-content-center">
            <div className="col-sm-12 col-md-6 d-flex justify-content-center">
                <SearchBar onFilter={onFilter}/>
            </div>
        </div>
        <div className="row justify-content-center">
            {render()}
        </div>
    </div>
}

export default memo(SearchPost)
