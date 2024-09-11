import { apiSlice } from "@/slicers/apiSlice";

import { DEPARTMENT_URL } from "@/configuration";

export const departmentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDepartments: builder.query({
            query: () => ({
                url: `${DEPARTMENT_URL}`,
            }),
            keepUnusedDataFor: 5
        })
    })
});

export const { useGetAllDepartmentsQuery } = departmentSlice;