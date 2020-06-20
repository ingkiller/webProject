import React, {useState, memo, useEffect} from 'react'
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const Paginator=props=>{
    const{paginator,cPage,nElem,handleOnClickBtn,title,btnAction,onChangeNElement}=props
    const [goPage,setGoPage]=useState(cPage)
    const [vElem,setVElem]=useState(nElem)

    useEffect(()=>{
        setGoPage(cPage)
    },[cPage])


    const _onGoToPage=evt=>{
        evt.preventDefault()
            if(evt.target.value !== undefined && evt.target.value !== null && evt.target.value !== ''){
            const p = parseInt(evt.target.value)
            if(p>paginator.pages){
                setGoPage(paginator.pages)
                return;
            }
            if(p<1){
                setGoPage(1)
                return;
            }
            setGoPage(p)
        }
    }

    const _onChangeNElement=evt=>{

        if(evt.target.value !== undefined && evt.target.value !== null && evt.target.value !== ''){
            let ne = parseInt(evt.target.value)
            if(ne > paginator.total){
                setVElem(paginator.total)
                return;
            }
            if(ne < 1){
                setVElem(nElem)
                return;
            }
            setVElem(ne)
            return;
        }
        setVElem('')
        return;
    }

    const _onSetNElement=evt=>{
        evt.preventDefault()
        if(vElem !== '')
         onChangeNElement(vElem)
        else{
            onChangeNElement(15)
        }
    }

    const drawPages=()=>{
        const nPages=paginator.pages
        if(nPages === 0)
            return null
        if(nPages <=7){
            return [...new Array(nPages)].map((index,key)=>{
                const c = (key+1)===cPage?'btn-secondary':'btn-outline-secondary'
                return <button value={key+1} key={key} type="button" className={"btn mr-0 " +c} onClick={handleOnClickBtn}>{key+1}</button>
            })
        }
        if(cPage < 5){
            let arrBtns = [...new Array(5)].map((index,key)=>{
                const c = (key+1)===cPage?'btn-secondary':'btn-outline-secondary'
                return <button key={key} type="button" className={"btn mr-0 " +c} onClick={handleOnClickBtn} value={key+1}>{key+1}</button>
            })

            arrBtns.push(<button type="button" className="btn btn-outline-secondary" value={(nPages+5)/2} onClick={handleOnClickBtn}>{'...'}</button>)
            const c = cPage === nPages?"btn-secondary":"btn-outline-secondary"
            arrBtns.push(<button type="button" className={"btn mr-0 "+ c} onClick={handleOnClickBtn} value={nPages}>{nPages}</button>)

            return [...arrBtns].map((btn,key)=>{
                return btn
            })
        }

        if(nPages - cPage > 3){
            let arrBtns = []
            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " onClick={handleOnClickBtn} value={1}>1</button>)
            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " value={(cPage+1)/2} onClick={handleOnClickBtn}>{'...'}</button>)

            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " onClick={handleOnClickBtn} value={cPage-1}>{cPage-1}</button> )
            arrBtns.push(<button type="button" className="btn btn-secondary mr-0 " onClick={handleOnClickBtn} value={cPage}>{cPage}</button> )
            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " onClick={handleOnClickBtn} value={cPage+1}>{cPage+1}</button> )
            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " value={(nPages+cPage+1)/2} onClick={handleOnClickBtn}>{'...'}</button>)
            arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " onClick={handleOnClickBtn} value={nPages}>{nPages}</button>)

            return [...arrBtns].map((btn,key)=>{
                return btn
            })
        }
        let arrBtns = []
        arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " onClick={handleOnClickBtn} value={1}>1</button>)
        arrBtns.push(<button type="button" className="btn btn-outline-secondary mr-0 " value={(cPage+1)/2} onClick={handleOnClickBtn}>{'...'}</button>)
        let cc = cPage === (nPages-4)?'btn-secondary':'btn-outline-secondary'
        arrBtns.push(<button type="button" className={"btn mr-0 " + cc} onClick={handleOnClickBtn} value={nPages-4}>{nPages-4}</button> )
        cc = cPage === (nPages-3)?'btn-secondary':'btn-outline-secondary'
        arrBtns.push(<button type="button" className={"btn mr-0 " + cc} onClick={handleOnClickBtn} value={nPages-3}>{nPages-3}</button> )
        cc = cPage === nPages-2?'btn-secondary':'btn-outline-secondary'
        arrBtns.push(<button type="button" className={"btn mr-0 " + cc} onClick={handleOnClickBtn} value={nPages-2}>{nPages-2}</button> )
        cc = cPage === nPages-1?'btn-secondary':'btn-outline-secondary'
        arrBtns.push(<button type="button" className={"btn mr-0 " + cc} onClick={handleOnClickBtn} value={nPages-1}>{nPages-1}</button>)
        cc = cPage === nPages?'btn-secondary':'btn-outline-secondary'
        arrBtns.push(<button type="button" className={"btn mr-0 " + cc} onClick={handleOnClickBtn} value={nPages}>{nPages}</button>)

        return [...arrBtns].map((btn,key)=>{
            return btn
        })

    }

    const _handleOnClickBtn=evt=>{
        evt.preventDefault()
        let v = parseInt(evt.target.value)
        if(v === cPage)
            return
        if(v > paginator.pages)
            return;
        if(v < 1)
            return;
        handleOnClickBtn(evt)
    }

    const drawPaginator=()=>{

        if(paginator === undefined || paginator === null)
            return null

        const {total}=paginator
        const nPages = paginator.pages
        return ( <div className="d-flex justify-content-between my-2">

            <div className={"col-4"}>{"Display " + ((cPage-1)*nElem +1)  + " to " +cPage*nElem+ " of: " +total}</div>
            <div className="col-8">
                <div className="float-right">
                    <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                        <div className="btn-group mr-2" role="group" aria-label="First group">
                            <button type="button" className="btn btn-outline-secondary mr-0" value={1} onClick={_handleOnClickBtn}>{'<<'}</button>
                            <button type="button" className="btn btn-outline-secondary mr-0" value={cPage-1} onClick={_handleOnClickBtn}>{'<'}</button>

                        </div>
                        <div className="btn-group mr-2" role="group" aria-label="Second group">
                            {
                                drawPages()
                            }
                        </div>
                        <div className="btn-group" role="group" aria-label="Third group">
                            <button type="button" className="btn btn-outline-secondary mr-0" value={cPage+1} onClick={_handleOnClickBtn}>{'>'}</button>
                            <button type="button" className="btn btn-outline-secondary mr-0" value={nPages} onClick={_handleOnClickBtn}>{'>>'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>)
    }

    return (
        <div className="w-100" >
            <div className={"d-flex "+(title || btnAction?"justify-content-between":"justify-content-end")}>
                {
                    title&&  <div className="p-2 bd-highlight"><h3>{title}</h3></div>
                }
                {
                    btnAction && <div className="p-2 bd-highlight"><button type="button" className="btn btn-outline-primary" onClick={btnAction.callback}>
                        <FontAwesomeIcon color={'#007BFF'} icon={faPlus}/>
                        <span className="ml-1">{btnAction.text}</span>
                    </button></div>
                }
            </div>
            <div className={"d-flex justify-content-between"}>
                <div className="p-2 bd-highlight">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="nElem"># Elem:</label>
                            <input  type="number" value={vElem} className="form-control" onChange={_onChangeNElement} id="nElem" style={{width: '70px'}}/>
                        </div>
                        <button disabled={vElem === ''} type="button" className="btn btn-default" onClick={_onSetNElement} >Set</button>
                    </form>
                </div>
                <div className="p-2 bd-highlight">
                    <form className="form-inline">
                        <div className="form-group">
                            <label htmlFor="npage">Page #:</label>
                            <input type="number"  onChange={_onGoToPage}  value={goPage} className="form-control" id="npage" style={{width: '70px'}}/>
                        </div>
                        <button type="button" className="btn btn-default" value={goPage} onClick={handleOnClickBtn} >Go</button>
                    </form>
                </div>
            </div>
            <div className="dropdown-divider"></div>


            {
                props.children
            }


            <div className="dropdown-divider"></div>
            {
                drawPaginator()
            }
        </div>
    )
}

Paginator.propTypes={
    paginator:PropTypes.object.isRequired,
    cPage:PropTypes.number.isRequired,
    nElem:PropTypes.number.isRequired,
    handleOnClickBtn:PropTypes.func.isRequired
}

export default memo(Paginator)
