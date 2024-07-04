import React from 'react'
import {  useSelector } from 'react-redux'
import { SelectAllUsers } from './usersSlice'
import { Link } from 'react-router-dom'

const UsersList = () => {
    const users=useSelector(SelectAllUsers)
    const renderedUsers=users.map((user)=>(
        <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
        </li>
        
    ))
  return (
    <section>
        <h2>Users</h2>
        {renderedUsers}
    </section>
    
  )
}

export default UsersList