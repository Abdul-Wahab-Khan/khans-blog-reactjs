import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EditUserForm from "./EditUserForm";
import { selectUserById } from "../users/usersApiSlice"; 

function EditUser() {
    const { id } = useParams()
    const user  = useSelector(st => selectUserById(st, id))
    const content = user ? <EditUserForm user={user} /> : <p>Loading ...</p>

    return content
} 

export default EditUser