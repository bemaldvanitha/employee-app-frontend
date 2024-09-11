import { apiSlice } from "@/slicers/apiSlice";

import { EMPLOYEE_URL } from "@/configuration";

export const employeeSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
       getAllEmployees: builder.query({
           query: ({ page, size }) => ({
               url: `${EMPLOYEE_URL}?page=${page}&size=${size}`
           }),
           keepUnusedDataFor: 5
       }),
       createEmployee: builder.mutation({
           query: (body) => ({
               url: `${EMPLOYEE_URL}/create`,
               body: body,
               method: 'POST'
           })
       }),
       updateEmployee: builder.mutation({
           query: ({ id, body }) => ({
               url: `${EMPLOYEE_URL}/update/${id}`,
               method: 'PATCH',
               body: body
           })
       }),
       deleteEmployee: builder.mutation({
           query: (id) => ({
               url: `${EMPLOYEE_URL}/${id}`,
               method: 'DELETE'
           })
       }),
       getSingleEmployee: builder.query({
           query: (id) => ({
               url: `${EMPLOYEE_URL}/${id}`,
           }),
           keepUnusedDataFor: 5
       })
   })
});

export const { useGetAllEmployeesQuery, useCreateEmployeeMutation, useUpdateEmployeeMutation, useDeleteEmployeeMutation,
    useGetSingleEmployeeQuery } = employeeSlice;