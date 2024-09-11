"use client";
import React, {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';
import { message, Pagination } from "antd";

import EmployeeTable from "@/components/home/EmployeeTable";
import CustomLoader from "@/components/common/custom-loader/CustomLoader";
import EmployeeDeleteModel from "@/components/home/EmployeeDeleteModel";
import NoContent from "@/components/common/no-content/NoContent";
import { useGetAllEmployeesQuery, useDeleteEmployeeMutation } from "@/slicers/employeeSlice";

import styles from './page.module.css';

const HomeScreen = () => {
    const router = useRouter();

    const [employees, setEmployees] = useState([]);

    const [visibleSalaries, setVisibleSalaries] = useState({});
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteId, setDeleteId] = useState(0);
    const [isDeleteModelOpen, setIsDeleteModelOpen] = useState(false);

    const { data: allEmployeeData, isLoading: allEmployeeIsLoading, refetch: allEmployeeRefetch,
        error: allEmployeeError } = useGetAllEmployeesQuery({ page, size });
    const [deleteEmployee, { isLoading: deleteEmployeeIsLoading }] = useDeleteEmployeeMutation();

    useEffect(() => {
        if(allEmployeeData?.employees && allEmployeeData?.pageCount){
            setEmployees(allEmployeeData?.employees);
            setTotalPages(allEmployeeData?.pageCount);
        }
    }, [allEmployeeData]);

    const toggleSalaryVisibility = (id) => {
        setVisibleSalaries(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    }

    const editEmployeeHandler = (id) => {
        router.push(`/create?edit_id=${id}`);
    }

    const deleteEmployeeHandler = (id) => {
        setDeleteId(id);
        setIsDeleteModelOpen(true);
    }

    const deleteConfirmHandler = async () => {
        try{
            const res = await deleteEmployee(deleteId).unwrap();
            setDeleteId(0);
            setIsDeleteModelOpen(false);

            message.success(res?.message);

            await allEmployeeRefetch();
        }catch (error){
            console.log(error);
            message.error(error?.data?.message);
        }
    }

    const deleteCancelHandler = () => {
        setDeleteId(0);
        setIsDeleteModelOpen(false);
    }

    const handlePageChange = (page, pageSize) => {
        setPage(page);
        setSize(pageSize);
    };

    if(allEmployeeIsLoading || deleteEmployeeIsLoading){
        return <CustomLoader/>
    }else {
        return (
            <div className={styles.homePage}>
                <div className={styles.homePageMainContainer}>
                    <p className={styles.homePageTitle}>All Employees</p>
                    {employees.length === 0 ? <NoContent/> :
                    <EmployeeTable employees={employees} visibleSalaries={visibleSalaries}
                                   toggleSalaryVisibility={toggleSalaryVisibility} editEmployeeHandler={editEmployeeHandler}
                                   deleteEmployeeHandler={deleteEmployeeHandler}/>}
                    <Pagination current={page} total={totalPages * size} pageSize={size} onChange={handlePageChange}
                                showSizeChanger={false}/>
                    {isDeleteModelOpen && <EmployeeDeleteModel onCancel={deleteCancelHandler} visible={isDeleteModelOpen}
                                                               onConfirm={deleteConfirmHandler}/>}
                </div>
            </div>
        );
    }
}

export default HomeScreen;