import { retry } from "@reduxjs/toolkit/query/react";
import { api } from "./api";
import { TCategories } from "../types/Categories";
import { TRental } from "../types/Rentals";

export interface Rental {
  id: number;
  name: string;
  fetched_at: string;
}

type RentalsResponse = Rental[];

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export const rentalsApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<{ token: string; user: User }, any>({
      query: (credentials: any) => ({
        url: "login",
        method: "POST",
        body: credentials
      }),
      extraOptions: {
        backoff: () => {
          // We intentionally error once on login, and this breaks out of retrying. The next login attempt will succeed.
          retry.fail({ fake: "error" });
        }
      }
    }),
    getRentals: build.query<TRental[], void>({
      query: () => ({ url: "rentals" }),
      providesTags: (result = []) => [
        ...result.map(({ _id }) => ({ type: "Rentals", _id } as const)),
        { type: "Rentals" as const, id: "LIST" }
      ]
    }),
    getCategories: build.query<TCategories[], void>({
      query: () => ({ url: "categories" }),
      providesTags: (result = []) => [
        ...result.map(({ _id }) => ({ type: "Categories", _id } as const)),
        { type: "Categories" as const, id: "LIST" }
      ]
    }),
    addRental: build.mutation<TRental, Partial<TRental>>({
      query: (body) => ({
        url: `rentals`,
        method: "POST",
        body
      }),
      invalidatesTags: [{ type: "Rentals", id: "LIST" }]
    }),
    getRental: build.query<TRental, number>({
      query: (_id) => `rentals/${_id}`,
      providesTags: (_rental, _err, _id) => [{ type: "Rentals", _id }]
    }),
    updateRental: build.mutation<TRental, Partial<TRental>>({
      query(data) {
        const { _id, ...body } = data;
        return {
          url: `rentals/${_id}`,
          method: "PUT",
          body
        };
      },
      invalidatesTags: (rental) => [{ type: "Rentals", id: rental?._id }]
    }),
    deleteRental: build.mutation<{ success: boolean; _id: number }, number>({
      query(_id) {
        return {
          url: `rentals/${_id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: (rental) => [{ type: "Rentals", _id: rental?._id }]
    }),
    getErrorProne: build.query<{ success: boolean }, void>({
      query: () => "error-prone"
    })
  }),
  overrideExisting: true
});

export const {
  useGetCategoriesQuery,
  useAddRentalMutation,
  useDeleteRentalMutation,
  useGetRentalQuery,
  useGetRentalsQuery,
  useLoginMutation,
  useUpdateRentalMutation,
  useGetErrorProneQuery
} = rentalsApi;

export const {
  endpoints: { login, getRental }
} = rentalsApi;
