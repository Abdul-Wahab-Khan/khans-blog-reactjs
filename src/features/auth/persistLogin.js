import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import usePersist from "../../hooks/usePersist";
import { useRefreshMutation } from "./authApiSlice";
import { currentToken } from "./authSlice";

export default function PersistLogin() {
    const [persist] = usePersist()
    const token = useSelector(currentToken)
    const effectRan = useRef(false)

    const [success, setSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess, 
        error,
        isError
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async() => {
                try {
                    console.log('verifying the token')
                    await refresh()
                    setSuccess(true)
                } catch(err) {
                    console.log(err)
                }
            }

            if (!token && persist) {
                verifyRefreshToken()
            }
        }

        return () => effectRan.current = true
    }, [])

    let content
    if (!persist) content = <Outlet />
    else if (isLoading) content = <p>Loading...</p>
    else if (isError) content = <Outlet />
    else if (isSuccess && success) content = <Outlet />
    else if (token && isUninitialized) content = <Outlet />

    return content
}