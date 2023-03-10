import { useEffect } from "react"
import { store } from "../../app/store"
import { postsApiSlice } from "../posts/postsApiSlice"
import { Outlet } from "react-router-dom"

const PrefetchPosts = () => {
    useEffect(() => {
        console.log('Posts subscribed')
        const posts = store.dispatch(postsApiSlice.endpoints.getposts.initiate())
        return () => {
            console.log('Posts unsubscribed')
            posts.unsubscribe()
        }
    })

    return <Outlet />
}

export default PrefetchPosts