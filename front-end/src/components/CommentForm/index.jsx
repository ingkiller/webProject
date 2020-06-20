import React,{memo,useState} from "react";
const CommentAddForm = props=>{
    const {isSaving, errorSaving}=props

    const [content,setContent]=useState("")

    const _onChangeContent=event=>{
        event.preventDefault()
        setContent(event.target.value)
    }

    const _onSubmit=event=>{
        event.preventDefault()
        props.addComment(content)
        setContent("")
    }
    return <div className="col-12 mb-5">
        <div className="card bg-light">

            <div className="card-body">
                <form onSubmit={_onSubmit}>
                    <div className="form-group">
                        <label htmlFor="content">Comment</label>
                        <textarea className="form-control" id="content" rows="3"
                                  placeholder={"Add your comment"}
                                  value={content} onChange={_onChangeContent} required/>
                    </div>
                    {
                        errorSaving  && <div className="alert alert-danger" role="alert">
                            System error, please contact site admin.
                        </div>
                    }
                    <div className="row justify-content-end px-3">
                        {
                            isSaving? <div className="spinner-border text-primary" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>: <button type="submit" className="btn btn-primary">Save</button>
                        }
                    </div>
                </form>
            </div>
        </div>
    </div>

}
export default memo(CommentAddForm)
