import {  useSelector } from "react-redux";
import { SelectAllUsers } from "../users/usersSlice";
import React from 'react'

const PostAuthor = ({userId}) => {//this userId is the id which comes from the select option in the dropdown menu of authors.
    const users=useSelector(SelectAllUsers)
    const author=users.find(user=>user.id===userId)
    return <span> by  {author?author.name:'Unknown Author'}</span>//span element is used in react to wrap up the dynamic content
}

export default PostAuthor