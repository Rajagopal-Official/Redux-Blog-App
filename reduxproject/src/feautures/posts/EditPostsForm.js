import { useDispatch, useSelector } from "react-redux"
import { useParams,useNavigate } from "react-router-dom"
import { selectPostById,updatePost,deletePost } from "./postsSlice"
import { useState } from "react"
import { SelectAllUsers } from "../users/usersSlice"
const EditPostsForm=()=>{
        const{postId}=useParams()
        const navigate=useNavigate()
        const users=useSelector(SelectAllUsers)
        const post=useSelector((state)=>selectPostById(state,Number(postId)))
        const[title,setTitle]=useState(post?.title)
        const[content,setContent]=useState(post?.body)//because in that dummy api there is body only there no content
        const[userId,setUserId]=useState(post?.userId)
        const[addRequestStatus,setAddRequestStatus]=useState('idle')
        const dispatch=useDispatch()
        

        if(!post){//In react use if conditions only after using the hooks.../otherwiese errors will be thrown.
            return(
                <section>
                    <h2>Post Not Found...</h2>
                </section>
            )
        }
        const onTitleChanged= e =>setTitle(e.target.value)//New Title
        const onContentChanged=e=>setContent(e.target.value)//New  Content
        const onAuthorChanged=e=>setUserId(Number(e.target.value))//New Authors SelectedUserId
        const canSave=[title,content,userId].every(Boolean)&&addRequestStatus==='idle'
        const onSavePostClicked=()=>{
            if(canSave){
                try{
                    setAddRequestStatus('pending')
                    dispatch(updatePost({id:post.id,title,body:content,userId,reactions:post.reactions})).unwrap()//since it is a thunk it is unwrapped to wrap down the promises
                    setTitle('')
                    setContent('')
                    setUserId('')
                    navigate(`/post/${post.id}`)
                }
                catch(err){
                    console.error('Failed to save Data,having some issues',err)
                }
                finally{
                    setAddRequestStatus('idle')
                }
            }
        }
        const userOptions=users.map((user)=>(
            <option key={user.id} value={user.id}>{user.name}</option>))
            const onDeletePostClicked=()=>{
                if(canSave){
                    try{
                        setAddRequestStatus('pending')
                        dispatch(deletePost({id:post.id})).unwrap()//since it is a thunk it is unwrapped to wrap down the promises
                        setTitle('')
                        setContent('')
                        setUserId('')
                        navigate('/')
                    }
                    catch(err){
                        console.error('Failed to delete Data,having some issues',err)
                    }
                    finally{
                        setAddRequestStatus('idle')
                    }
                }
            }

        return(
            <section>
                        <h2>EditPost</h2>
                        <form action="postedit">
                                <label htmlFor="postTitle">Post Title:</label>
                                <input type="text"
                                id='postTitle'
                                name="postTitle"
                                value={title}
                                onChange={onTitleChanged}/>
                                <label htmlFor="postAuthor">Author:</label>
                                <select name="postAuthor" id="postAuthor "value={userId} onChange={onAuthorChanged}>
                                    <option value=""></option>
                                    {userOptions}
                                </select>
                                <label htmlFor="postContent">Post Content:</label>
                                <textarea 
                                id='postContent'
                                name="postContent"
                                value={content}
                                onChange={onContentChanged}/>
                                <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post</button>
                                <button  className="deleteButton"type='button' onClick={onDeletePostClicked} >Delete Post</button>
                         </form>
            </section>
        )


}
export default EditPostsForm