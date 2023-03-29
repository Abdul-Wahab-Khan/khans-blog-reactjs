import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({});
const initialState = postsAdapter.getInitialState();

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getposts: builder.query({
      query: () => "/api/posts",
      validatedStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedposts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedposts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "post", id })),
          ];
        } else return [{ type: "post", id: "LIST" }];
      },
    }),
    getUserPosts: builder.query({
      query: () => "/api/posts/user",
      validatedStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedposts = responseData.map((post) => {
          post.id = post._id;
          return post;
        });
        return postsAdapter.setAll(initialState, loadedposts);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "post", id: "LIST" },
            ...result.ids.map((id) => ({ type: "post", id })),
          ];
        } else return [{ type: "post", id: "LIST" }];
      },
    }),
    addpost: builder.mutation({
      query: (initialpostData) => ({
        url: "/api/posts",
        method: "POST",
        body: {
          ...initialpostData,
        },
      }),
      invalidatesTags: [{ type: "post", id: "LIST" }],
    }),
    updatepost: builder.mutation({
      query: (initialpostData) => ({
        url: "/api/posts",
        method: "PUT",
        body: {
          ...initialpostData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    deletepost: builder.mutation({
      query: ({ id }) => ({
        url: "/api/posts",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    approvePost: builder.mutation({
      query: ({ id }) => ({
        url: "api/admin/mark-approved",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    disApprovePost: builder.mutation({
      query: ({ id }) => ({
        url: "api/admin/mark-disapproved",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    likePost: builder.mutation({
      query: ({ id }) => ({
        url: "api/posts/like",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    unlikePost: builder.mutation({
      query: ({ id }) => ({
        url: "api/posts/unlike",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
    isLikedByCurrentUser: builder.mutation({
      query: ({ id }) => ({
        url: "api/posts/isliked",
        method: "POST",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "post", id: arg.id }],
    }),
  }),
});

export const {
  useGetpostsQuery,
  useGetUserPostsQuery,
  useAddpostMutation,
  useUpdatepostMutation,
  useDeletepostMutation,
  useApprovePostMutation,
  useDisApprovePostMutation,
  useLikePostMutation,
  useUnlikePostMutation,
  useIsLikedByCurrentUserMutation,
} = postsApiSlice;

export const selectpostsResult = postsApiSlice.endpoints.getposts.select();

const selectpostsData = createSelector(
  selectpostsResult,
  (postsResult) => postsResult.data
);

export const {
  selectAll: selectAllposts,
  selectById: selectpostById,
  selectIds: selectpostsIds,
} = postsAdapter.getSelectors(
  (state) => selectpostsData(state) ?? initialState
);
