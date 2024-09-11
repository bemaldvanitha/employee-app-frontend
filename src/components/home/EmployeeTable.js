import React from 'react';
import { MdDelete, MdEdit, MdVisibility, MdVisibilityOff } from 'react-icons/md';

import styles from './EmployeeTable.module.css';

const EmployeeTable = ({ employees, visibleSalaries, toggleSalaryVisibility, editEmployeeHandler, deleteEmployeeHandler }) => {
    return (
        <table className={styles.table}>
            <thead className={styles.tableHeader}>
            <tr>
                <th className={styles.tableHeaderCell}>Id</th>
                <th className={styles.tableHeaderCell}>First Name</th>
                <th className={styles.tableHeaderCell}>Last Name</th>
                <th className={styles.tableHeaderCell}>Gender</th>
                <th className={styles.tableHeaderCell}>Date Of Birth</th>
                <th className={styles.tableHeaderCell}>Department</th>
                <th className={styles.tableHeaderCell}>Address</th>
                <th className={styles.tableHeaderCell}>Basic Salary</th>
                <th className={styles.tableHeaderCell}>Actions</th>
            </tr>
            </thead>
            <tbody>
                {employees.map((employee, idx) => (
                    <tr key={employee.id}
                        className={`${idx % 2 === 1 ? styles.tableRowEven : ''} ${styles.tableRowHover}`}>
                        <td className={styles.tableCell}>{employee.id}</td>
                        <td className={styles.tableCell}>{employee.firstName}</td>
                        <td className={styles.tableCell}>{employee.lastName}</td>
                        <td className={styles.tableCell}>{employee.gender}</td>
                        <td className={styles.tableCell}>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                        <td className={styles.tableCell}>{employee.department}</td>
                        <td className={styles.tableCell}>{employee.address}</td>
                        <td className={styles.tableCell}>
                            <div className={styles.salaryContainer}>
                                {visibleSalaries[employee.id] ? (
                                    <>
                                        {employee.basicSalary}
                                        <MdVisibilityOff
                                            className={styles.toggleIcon}
                                            size={24}
                                            onClick={() => toggleSalaryVisibility(employee.id)}
                                        />
                                    </>
                                ) : (
                                    <>
                                        ********
                                        <MdVisibility
                                            className={styles.toggleIcon}
                                            size={24}
                                            onClick={() => toggleSalaryVisibility(employee.id)}
                                        />
                                    </>
                                )}
                            </div>
                        </td>
                        <td className={styles.tableCell}>
                            <div className={styles.tableActionIconContainer}>
                                <MdEdit
                                    className={`${styles.tableActionIcon} ${styles.tableEditIcon}`}
                                    size={24}
                                    onClick={() => editEmployeeHandler(employee.id)}
                                />
                                <MdDelete
                                    className={`${styles.tableActionIcon} ${styles.tableDeleteIcon}`}
                                    size={24}
                                    onClick={() => deleteEmployeeHandler(employee.id)}
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default EmployeeTable;