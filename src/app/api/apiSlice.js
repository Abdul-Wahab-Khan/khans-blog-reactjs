import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3002',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})

const baseQueryWithRefreshing = async (args, api, options) => {
    let result = await baseQuery(args, api, options)
    if(result?.error?.status === 403) {
        console.log('requesting for refresh token')
        const refreshTokenResult = await baseQuery('/api/auth/refresh', api, options)

        if (refreshTokenResult?.data) {
            api.dispatch(setCredentials({...refreshTokenResult.data }))
            result = await baseQuery(args, api, options)
        } else {
            if (refreshTokenResult?.error?.status === 403)
                refreshTokenResult.error.data.message = "Please log in again."

            return refreshTokenResult
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithRefreshing,
    tagTypes: ['User', 'Post', 'Like', 'Author'],
    endpoints: builder => ({})
})