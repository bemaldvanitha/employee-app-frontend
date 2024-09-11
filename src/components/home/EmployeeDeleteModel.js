import React from 'react';
import { Modal, Button } from 'antd';
import styles from './EmployeeDeleteModel.module.css';

const EmployeeDeleteModal = ({ visible, onConfirm, onCancel }) => {
    return (
        <Modal title="Delete Confirmation" open={visible} onOk={onConfirm} onCancel={onCancel} okText="Delete" cancelText="Cancel"
            className={styles.modal}>
            <p>Are you sure you want to delete this employee?</p>
        </Modal>
    );
};

export default EmployeeDeleteModal;