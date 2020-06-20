import React, {memo, useCallback, useEffect, useState} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {debounce} from "lodash";

const Container = styled.span`
    position: relative;
    margin: auto -30px;
`

const SearchBar=(props)=>{

    const [_search,setSearch]=useState("")

    const delay = useCallback(debounce((value)=>{
        props.onFilter(value)

    },500),[])

    const _onChange=event=>{
        delay(event.target.value)
        setSearch(event.target.value)
    }

    return <form className="form-inline w-75">
        <input onChange={ _onChange} value={_search}  type="text" className="form-control w-100" placeholder="Post Title"/>
        <Container>
            <FontAwesomeIcon icon={faSearch}/>
        </Container>
    </form>
}

export default memo(SearchBar)
