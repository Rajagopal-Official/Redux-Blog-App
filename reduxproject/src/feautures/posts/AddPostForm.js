import React,{useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'//postsAdded is the reducer action called from postsSlice
import { SelectAllUsers } from '../users/usersSlice'
import { useNavigate } from 'react-router-dom'

const AddPostForm = () => {
    const dispatch=useDispatch()
    const[title,setTitle]=useState('')
    const[content,setContent]=useState('')
    const[userId,setUserId]=useState('')
    const users=useSelector(SelectAllUsers)
    const[addRequestStatus,setAddRequestStatus]=useState('idle')
    const navigate=useNavigate()
    const onTitleChanged=e=>setTitle(e.target.value) 
    const onContentChanged=e=>setContent(e.target.value)
    const onAuthorChanged=e=>setUserId(e.target.value)
    const canSave=[title,content,userId].every(Boolean)&&addRequestStatus==='idle' 
  
    const onSavePostClicked=()=>{
      if(canSave){
        try{
          setAddRequestStatus('pending')
          dispatch(addNewPost({title,body:content,userId})).unwrap()//it will unwrap the status es of the promise
          setTitle('')
          setContent('')
          setUserId('')
          navigate('/')
        }
        catch(err){
          console.error('Failed to add new  post',err)
        }finally{
          setAddRequestStatus('idle')
        }
      }
    }
    //     if(title&&content){
    //         dispatch(postsAdded(title,content,userId))//postAdded reducer action is called and it will update the state
    //     }
    //     setTitle('')
    //     setContent('')
    // }
    const userOptions= users.map((user)=>(
      <option value={user.id} key={user.id}>
        {user.name}
      </option>
      ))
      
      
  
  return (
    <section>
    <h2>Add a New Post</h2>
    <form action="AddingPosts">
        <label htmlFor="postTitle">Title:</label>
        <input type="text"
        id="postTitle"
        name='postTitle'
        value={title}
        onChange={onTitleChanged}/>
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" value={userId} onChange={onAuthorChanged}>
        {/* here value={userId} is the value which we will got at the end while pressing that particular author,that particular authors userid will be stored in this value. */}
          <option value="">Select An Author</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea 
        id="postContent"
        name='postContent'
        value={content}
        onChange={onContentChanged}/>
        <button type='button' onClick={onSavePostClicked} disabled={!canSave}>Save Post!</button>
    </form>
    </section>
    
  )
}

export default AddPostForm