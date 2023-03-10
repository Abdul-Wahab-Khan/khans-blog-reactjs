import { apiSlice } from '../../app/api/apiSlice'
import { logOut, setCredentials } from './authSlice'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        logOutUser: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch(err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/api/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(arg, {dispatch, queryFulfilled}) {
                try {
                    const { data } = await queryFulfilled
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch(err) {
                    console.log(err)
                }
            }
        })
    })
})


export const {
    useLogOutUserMutation,
    useLoginMutation,
    useRefreshMutation,
} = authApiSlice