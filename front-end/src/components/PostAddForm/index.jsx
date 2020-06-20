import React,{memo,useState} from "react";
const PostAddForm = props=>{
    const {isSaving,errorPosts}=props
    const [title,setTitle]=useState("")
    const [category,setCategory]=useState("Sport")
    const [content,setContent]=useState("")

    const _onChangeTitle=event=>{
        event.preventDefault()
        setTitle(event.target.value)
    }
    const _onChangeCategory=event=>{
        event.preventDefault()
        setCategory(event.target.value)
    }

    const _onChangeContent=event=>{
        event.preventDefault()
        setContent(event.target.value)
    }

    const _onSubmit=event=>{
        event.preventDefault()
        props.onSave({title,category,content})
    }
    return <div className="col-sm-12 col-md-6 my-5">
        <div className="card">
            <div className="card-header">
                Add Post
            </div>
            <div className="card-body">
                <form onSubmit={_onSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" value={title} className="form-control" id="title" placeholder="Title" onChange={_onChangeTitle} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="categories">Category</label>
                        <select  className="form-control" value={category} id="categories" onChange={_onChangeCategory}>
                            <option value={"Sport"}>Sport</option>
                            <option value={"Music"}>Music</option>
                            <option value={"Art"}>Art</option>
                            <option value={"Other"}>Other</option>

                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Comment</label>
                        <textarea className="form-control" id="content" rows="3" value={content} onChange={_onChangeContent} required/>
                    </div>
                    {
                        errorPosts  && <div className="alert alert-danger" role="alert">
                            Error msg!!
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
export default memo(PostAddForm)
