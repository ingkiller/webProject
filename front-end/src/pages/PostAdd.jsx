import React,{memo} from "react";
import {useDispatch,useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
//mport * as toxicity from '@tensorflow-models/toxicity';
import {PostAddForm} from '../components'
import {addNewPost} from "../reducers/posts";

const PostAdd = props=>{
    const {isSaving,errorPost}=useSelector(state=>state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const _onSavePost=post=>{
/*
        const threshold = 0.9;

        toxicity.load(threshold).then(model => {
            const sentences = [post];
            model.classify(sentences).then(predictions => {
                 console.log(predictions);
            });
        });
*/
        dispatch(addNewPost(post)).then(result=>{
            if(result.payload.error === undefined){
                history.push('/posts')
            }
        })
    }
    return <div className="container pt-3 containerHeight">
        <div className="row justify-content-center">
            <PostAddForm isSaving={isSaving} errorPosts={errorPost} onSave={_onSavePost}/>
        </div>
    </div>
}

export default memo(PostAdd)
