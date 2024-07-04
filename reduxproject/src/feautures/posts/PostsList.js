import React from 'react'
import { useSelector} from 'react-redux'
import { selectPostIds,getPostsStatus,getPostsError } from './postsSlice'
import PostDisplayer from './PostDisplayer'

const PostsList = () => {
    const orderedPostsIds=useSelector(selectPostIds)
    const postStatus=useSelector(getPostsStatus)
    const error=useSelector(getPostsError)
    // useEffect(()=>{
    //   if(postStatus==='idle'){
    //     dispatch(fetchPosts())
    //   }
    // },[postStatus,dispatch])//it is always better to avoid using useEffect since it will cause performance related issue,so dispatch function while launching the app itself in index.js
    let content;
    if(postStatus==='loading')
    {
      content=<p>Loading...</p>
      
    }   
    else if(postStatus==='succeeded'){
    // const orderedPosts=posts.slice().sort((a,b)=>b.date.localeCompare(a.date))
    content=orderedPostsIds.map(postId=>(<PostDisplayer key={postId} postId={postId} /> ))
    }
    else if(postStatus==='rejected'){
      content=<p>{error}</p>
    }
  return (
    <section>
        <h2>Posts</h2>
        {content}
    </section>
    
  )
}

export default PostsList