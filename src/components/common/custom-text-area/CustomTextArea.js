import React from 'react';
import styles from './CustomTextArea.module.css'; // Adjust the import to CSS Modules

const CustomTextArea = ({
                            id,
                            isError,
                            errorMessage,
                            title,
                            value,
                            onChangeHandle,
                            placeholder
                        }) => {
    return (
        <div className={styles.customTextAreaContainer}>
            <label className={styles.customTextAreaLabel}>
                {title}
            </label>
            <textarea
                id={id}
                value={value}
                onChange={onChangeHandle}
                placeholder={placeholder}
                className={styles.customTextArea}
            ></textarea>
            {isError && <p className={styles.customTextAreaError}>{errorMessage}</p>}
        </div>
    );
};

export default CustomTextArea;
