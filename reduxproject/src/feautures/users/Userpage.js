import React from 'react'
import { useParams } from 'react-router-dom'
import { selectUserById } from './usersSlice'
import { useSelector } from 'react-redux'
import { selectPostsByUser } from '../posts/postsSlice'
import { Link } from 'react-router-dom'

const Userpage = () => {
    const {userId}=useParams()
    const user=useSelector(state=>selectUserById(state,Number(userId)))
    // const postsForUser = posts.filter(post => post.userId === Number(userId));//keeping the ffilter here in th sense may cause multiple rendering
    const postsForUser=useSelector((state)=>selectPostsByUser(state,Number(userId)))
    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));
    
        
    
  return (
    <section>
    <h2>{user?.name}</h2>
    <ol>{postTitles}</ol>
    </section>

    
  )
}

export default Userpage