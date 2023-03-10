import { useEffect } from "react"
import { store } from "../../app/store"
import { usersApiSlice } from "./usersApiSlice"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
    useEffect(() => {
        console.log("Users Subscribed")
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log('users Unsubscribed')
            users.unsubscribe()
        }
    }, [])

    return <Outlet />
}

export default Prefetch