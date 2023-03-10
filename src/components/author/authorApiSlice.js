import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const authorAdapter = createEntityAdapter({})
const initialState = authorAdapter.getInitialState()

export const authorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAuthor: builder.query({
            query: () => '/api/author',
            validatedStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedAuthor = responseData.map(author => {
                    author.id = author._id
                    return author
                })
                return authorAdapter.setAll(initialState, loadedAuthor)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'author', id: 'LIST' },
                        ...result.ids.map(id => ({type: 'author', id}))
                    ]
                } else return [{type: 'author', id: 'LIST'}]
            }
        }),
        addInfo: builder.mutation({
            query: initialpostData => ({
                url: '/api/author/info',
                method: "POST", 
                body: {
                    ...initialpostData
                }
            }),
            invalidatesTags: [
                {type:'post', id: 'LIST'}
            ]
        }),
        updateInfo: builder.mutation({
            query: initialpostData => ({
                url: '/api/author/info',
                method: "PUT", 
                body: {
                    ...initialpostData
                }
            }),
            invalidatesTags: [
                {type:'post', id: 'LIST'}
            ]
        }),
        addLinks: builder.mutation({
            query: initialpostData => ({
                url: '/api/author/links',
                method: "POST", 
                body: {
                    ...initialpostData
                }
            }),
            invalidatesTags: [
                {type:'post', id: 'LIST'}
            ]
        }),
        addWebsites: builder.mutation({
            query: initialpostData => ({
                url: '/api/author/websites',
                method: "POST", 
                body: {
                    ...initialpostData
                }
            }),
            invalidatesTags: [
                {type:'post', id: 'LIST'}
            ]
        }),
    })
})

export const {
    useGetAuthorQuery,
    useAddInfoMutation,
    useAddLinksMutation,
    useAddWebsitesMutation,
    useUpdateInfoMutation,
} = authorApiSlice

