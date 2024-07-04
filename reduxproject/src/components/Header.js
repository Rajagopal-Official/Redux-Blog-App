import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCount, increaseCount } from '../feautures/posts/postsSlice'

const Header = () => {
  const dispatch=useDispatch()
  const counter=useSelector(getCount)
  return (
    <header className='Header'>
      <h1>Redux Blog Application</h1>
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="post">Post</Link></li>
                <li><Link to="user">Users</Link></li>
            </ul>
            <button onClick={()=>dispatch(increaseCount())}>
              {counter}
            </button>
        </nav>

    </header>
  )
}

export default Header