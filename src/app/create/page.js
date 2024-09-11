"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { message } from "antd";

import CustomInput from "@/components/common/custom-input/CustomInput";
import CustomSelect from "@/components/common/custom-select/CustomSelect";
import CustomTextArea from "@/components/common/custom-text-area/CustomTextArea";
import CustomButton from "@/components/common/custom-button/CustomButton";
import CustomLoader from "@/components/common/custom-loader/CustomLoader";
import { useGetAllDepartmentsQuery } from "@/slicers/departmentSlice";
import { useCreateEmployeeMutation, useGetSingleEmployeeQuery, useUpdateEmployeeMutation } from "@/slicers/employeeSlice";

import styles from "./page.module.css";

const genders = ['Male', 'Female', 'Other'];

const CreateProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const edit_id = searchParams.get('edit_id');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: '',
        address: '',
        department: '',
        departmentTypeOther: '',
        basicSalary: 0
    });

    const [isFieldError, setIsFieldError] = useState({
        isFirstNameError: false,
        isLastNameError: false,
        isGenderError: false,
        isDateOfBirthError: false,
        isAddressError: false,
        isDepartmentTypeOtherError: false,
        isDepartmentError: false,
        isBasicSalaryError: false
    });

    const [departments, setDepartments] = useState([]);

    const { data: departmentData, isLoading: departmentsIsLoading, error: departmentsError } = useGetAllDepartmentsQuery();
    const { data: singleEmployeeData, isLoading: singleEmployeeIsLoading, error: singleEmployeeError } =
        useGetSingleEmployeeQuery(edit_id, { skip: !edit_id});
    const [createEmployee, { isLoading: createEmployeeIsLoading }] = useCreateEmployeeMutation();
    const [updateEmployee, { isLoading: updateEmployeeIsLoading }] = useUpdateEmployeeMutation();

    useEffect(() => {
        if (departmentData?.departments) {
            const departmentsWithOther = [...departmentData.departments, 'Other'];
            setDepartments(departmentsWithOther);
        }
    }, [departmentData]);

    useEffect(() => {
        if(singleEmployeeData?.employee) {
            const employee = singleEmployeeData?.employee;

            const dateObject = new Date(employee?.dateOfBirth);
            const formattedDate = dateObject.toISOString().split('T')[0];

            setFormData({
                firstName: employee?.firstName,
                lastName: employee?.lastName,
                gender: employee?.gender,
                dateOfBirth: formattedDate,
                address: employee?.address,
                department: employee?.department,
                departmentTypeOther: '',
                basicSalary: employee?.basicSalary
            });
        }
    }, [singleEmployeeData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const firstNameChangeHandler = (e) => {
        handleChange('firstName', e.target.value);
    }

    const lastNameChangeHandler = (e) => {
        handleChange('lastName', e.target.value);
    }

    const genderChangeHandler = (e) => {
        handleChange('gender', e.target.value);
    }

    const dateOfBirthChangeHandler = (e) => {
        handleChange('dateOfBirth', e.target.value);
    }

    const addressChangeHandler = (e) => {
        handleChange('address', e.target.value);
    }

    const departmentChangeHandler = (e) => {
        handleChange('department', e.target.value);
    }

    const departmentTypeOtherChangeHandler = (e) => {
        handleChange('departmentTypeOther', e.target.value);
    }

    const basicSalaryChangeHandler = (e) => {
        handleChange('basicSalary', e.target.value);
    }

    function isValidDateOfBirth(dateOfBirth) {
        if (!dateOfBirth || isNaN(Date.parse(dateOfBirth))) {
            return false;
        }

        const dob = new Date(dateOfBirth);
        const today = new Date();

        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        const dayDiff = today.getDate() - dob.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;
        }

        return age >= 16;
    }

    const submitHandler = async () => {
        const firstNameValidity = formData.firstName.trim().length >= 3;
        const lastNameValidity = formData.lastName.trim().length >= 3;
        const genderValidity = formData.gender.trim().length > 0;
        const dobValidity = formData.dateOfBirth.trim().length > 0 && isValidDateOfBirth(formData.dateOfBirth);
        const addressValidity = formData.address.trim().length >= 5;
        const departmentValidity = formData.department.trim().length > 0;
        const departmentTypeValidity = formData.department.trim() !== 'Other' ||
            formData.departmentTypeOther.trim().length >= 2;
        const basicSalaryValidity = !isNaN(formData.basicSalary) && parseFloat(formData.basicSalary) > 0;

        setIsFieldError({
            isFirstNameError: false,
            isLastNameError: false,
            isGenderError: false,
            isDateOfBirthError: false,
            isAddressError: false,
            isDepartmentTypeOtherError: false,
            isDepartmentError: false,
            isBasicSalaryError: false
        });

        if(firstNameValidity && lastNameValidity && genderValidity && dobValidity && addressValidity &&
            departmentTypeValidity && departmentValidity && basicSalaryValidity){

            if(edit_id){
                try {
                    let id = edit_id;
                    let body = {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        dateOfBirth: formData.dateOfBirth,
                        address: formData.address,
                        basicSalary: parseFloat(formData.basicSalary),
                        department: formData.department === 'Other' ? formData.departmentTypeOther : formData.department,
                        gender: formData.gender
                    };

                    const res = await updateEmployee({ id, body }).unwrap();
                    message.success(res?.message);
                }catch (error){
                    console.log(error);
                    message.error(error?.data?.message);
                }
            }else {
                try{
                    const res = await createEmployee({
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        dateOfBirth: formData.dateOfBirth,
                        address: formData.address,
                        basicSalary: parseFloat(formData.basicSalary),
                        department: formData.department === 'Other' ? formData.departmentTypeOther : formData.department,
                        gender: formData.gender
                    }).unwrap();

                    message.success(res?.message);

                }catch (error){
                    console.log(error);
                    message.error(error?.data?.message);
                }
            }

            router.push('/');
        }else {
            setIsFieldError({
                isFirstNameError: !firstNameValidity,
                isLastNameError: !lastNameValidity,
                isGenderError: !genderValidity,
                isDateOfBirthError: !dobValidity,
                isAddressError: !addressValidity,
                isDepartmentTypeOtherError: !departmentTypeValidity,
                isDepartmentError: !departmentValidity,
                isBasicSalaryError: !basicSalaryValidity
            });
        }
    }

    if(departmentsIsLoading || createEmployeeIsLoading || updateEmployeeIsLoading || singleEmployeeIsLoading){
        return <CustomLoader/>
    }else {
        return (
            <div className={styles.createEmployeeScreen}>
                <div className={styles.createEmployeeScreenContainer}>
                    <p className={styles.createEmployeeScreenTitle}>{edit_id ? 'Update Employee Record' :
                        'Create New Employee'}</p>
                    <CustomInput id={'firstName'} value={formData.firstName} type={'text'}
                                 errorMessage={'Enter valid first name'}
                                 isError={isFieldError.isFirstNameError} title={'First Name'}
                                 placeholder={'Enter first name'}
                                 onChangeHandle={firstNameChangeHandler}/>
                    <CustomInput id={'lastName'} value={formData.lastName} type={'text'}
                                 errorMessage={'Enter valid last name'}
                                 isError={isFieldError.isLastNameError} title={'Last Name'} placeholder={'Enter last name'}
                                 onChangeHandle={lastNameChangeHandler}/>
                    <CustomSelect id={'gender'} onChangeHandle={genderChangeHandler} isError={isFieldError.isGenderError}
                                  value={formData.gender} title={'Gender'} errorMessage={'Select gender'}
                                  options={genders}/>
                    <CustomInput id={'dateOfBirth'} type={'date'} placeholder={'Select date of birth'}
                                 title={'Date Of Birth'} isError={isFieldError.isDateOfBirthError}
                                 errorMessage={'Select valid date of birth (Employee can not under age 16)'}
                                 value={formData.dateOfBirth} onChangeHandle={dateOfBirthChangeHandler}/>
                    <CustomTextArea id={'address'} value={formData.address} onChangeHandle={addressChangeHandler}
                                    isError={isFieldError.isAddressError} placeholder={'Enter address'} title={'Address'}
                                    errorMessage={'Enter valid address'}/>
                    <CustomSelect id={'department'} errorMessage={'Select department'}
                                  isError={isFieldError.isDepartmentError}
                                  value={formData.department} title={'Department'} onChangeHandle={departmentChangeHandler}
                                  options={departments}/>
                    {formData.department === 'Other' && <CustomInput id={'departmentTypeOther'} type={'text'}
                               errorMessage={'Enter valid department name'} isError={isFieldError.isDepartmentTypeOtherError}
                               value={formData.departmentTypeOther} title={'If you select other please mention it'}
                               placeholder={'If you select other please mention it'}
                               onChangeHandle={departmentTypeOtherChangeHandler}/>}
                    <CustomInput id={'basicSalary'} type={'number'} title={'Basic Salary'}
                                 onChangeHandle={basicSalaryChangeHandler}
                                 placeholder={'Enter basic salary'} value={formData.basicSalary}
                                 errorMessage={'Enter valid basic salary'}
                                 isError={isFieldError.isBasicSalaryError}/>
                    <CustomButton title={`${edit_id ? 'Update': 'Save'}`} fontColor={'#f0f0f0'} onClick={submitHandler} bgColor={'#3498db'}/>
                </div>
            </div>
        );
    }
}

export default CreateProduct;