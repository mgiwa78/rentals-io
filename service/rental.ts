import { api } from "./api";

export const postApi = api.injectEndpoints({
  endpoints: (build) => ({
    addPost: build.mutation<any, Partial<any>>({
      query(body) {
        return {
          url: `posts`,
          method: "POST",
          body
        };
      },
      invalidatesTags: ["Rentals"]
    }),
    getPost: build.query<any, number>({
      query: (id) => `posts/${id}`,
      providesTags: (_result, _err, id) => [{ type: "Rentals", id }]
    }),
    updatePost: build.mutation<any, Partial<any>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `posts/${id}`,
          method: "PUT",
          body
        };
      },
      invalidatesTags: (post) => [{ type: "Rentals", id: post?.id }]
    }),
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: (post) => [{ type: "Rentals", id: post?.id }]
    })
  }),
  overrideExisting: true
});
