import React from 'react'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPostById } from './postsSlice'

const PostDisplayer = ({postId}) => {//heresince we gettingthe posts and finding the posts only by id ,so we can eliminate multiple rendering....
  const post=useSelector(state=>selectPostById(state,postId))
  return (
    <article >
        <h3>{post.title}</h3>
        <p className='excerpt'>{post.body.substring(0,75)}...</p>
        <p className='postCredit'>
          <Link to ={`post/${post.id}`}>ViewPost</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post}/>
        </p>
    </article>
  )
}
// PostDisplayer=React.memo(PostDisplayer)//react.memo will only render the component when the passed prop changes
export default PostDisplayer