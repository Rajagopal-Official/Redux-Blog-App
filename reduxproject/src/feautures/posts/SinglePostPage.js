import {  useSelector } from "react-redux"
import { selectPostById } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
import { Link } from "react-router-dom"
import { useParams } from "react-router-dom"
const SinglePostPage = () => {
    const{postId}=useParams()
    const post=useSelector((state)=>selectPostById(state,Number(postId)))//Since we need to pass that postId over here we use a arrow function over here in useSelector
  if(!post){//if post not found in the sense
    return (
        <section>
            <h2>No Posts to Display...</h2>
        </section>
    
        )
  }
  return(
    <article >
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <p className='postCredit'>
        <PostAuthor userId={post.userId} />
        </p>
        <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post}/>
    </article>

  )
  
}

export default SinglePostPage