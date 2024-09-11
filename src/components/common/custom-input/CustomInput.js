import React from 'react';

import styles from './CustomInput.module.css';

const CustomInput = ({ id, isError, errorMessage, title, value, onChangeHandle, placeholder, type }) => {
    return (
        <div className={styles.customInputContainer}>
            <label className={styles.customInputLabel}>
                {title}
            </label>
            <input id={id} value={value} onChange={onChangeHandle} placeholder={placeholder} type={type}
                   className={styles.customInput}/>
            {isError && <p className={styles.customInputError}>{errorMessage}</p>}
        </div>
    );
};

export default CustomInput;