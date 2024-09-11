import React from 'react';

import styles from './CustomButton.module.css';

const CustomButton = ({ title, bgColor, fontColor, onClick }) => {
    return (
        <div onClick={onClick} style={{ backgroundColor: bgColor }} className={styles.customButtonContainer}>
            <p style={{ color: fontColor }} className={styles.customButtonText}>
                {title}
            </p>
        </div>
    );
};

export default CustomButton;
