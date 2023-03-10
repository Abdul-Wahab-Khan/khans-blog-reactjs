import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})
const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/api/users', 
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({type: 'User', id}))
                    ]
                } else return [{type: 'User', id: 'LIST'}]
            }
        }),
        addUser: builder.mutation({
            query: initialUserData => ({
                url: '/api/auth/register',
                method: "POST",
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: [
                {type:'User', id: 'LIST'}
            ]
        }),
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: '/api/users/update-info',
                method: "PUT",
                body: {
                    ...initialUserData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        }),
        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: '/api/users',
                method: "DELETE",
                body: {id}
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'User', id: arg.id}
            ]
        })
    })
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersApiSlice

export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds,
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
