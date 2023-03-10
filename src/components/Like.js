import React, { useCallback, useEffect, useRef, useState } from "react";
import { useIsLikedByCurrentUserMutation, useLikePostMutation, useUnlikePostMutation } from "../features/posts/postsApiSlice";

function Liker({postId}) {
    const [isPostLiked] = useIsLikedByCurrentUserMutation()

    useEffect(() => {
        isPostLiked({postId})
            .then(res => {
                res.data.liked ? setIsLiked(true) : setIsLiked(false)
            })
            .catch(err => console.log(err))
    }, [])

    const [isLiked, setIsLiked] = useState(false)

    const [likePost, {isSuccess: isLikedSuccess, isError, error}] = useLikePostMutation()
    const [unlikePost, 
        {isSuccess: isUnlikedSuccess, isError: isUnlikeError, error: unlikeError}
    ] = useUnlikePostMutation()

    const setLikeUnliked = e => {
        setIsLiked(p => !p)
        setTimeout(() => {
            likeUserPost()
        }, 1000)
    }

    const likeUserPost = async () => {
        if (isLiked) 
            await likePost({postId})
        else 
            await unlikePost({postId})
    }

    if(isError) {
        console.log(error.data)
    }

    if(isUnlikeError) {
        console.log(unlikeError.data)
    }

    if(isLikedSuccess) {
        console.log('Liked')
    }

    if(isUnlikedSuccess) {
        console.log('Unliked')
    }

    return (
        <div>
            <button onClick={setLikeUnliked} className="btn btn-success">
                {isLiked ? "Unlike" : "Like"}
            </button>
        </div>
    )
}

export default Liker