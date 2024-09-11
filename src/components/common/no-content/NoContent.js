import React from 'react';
import { Empty } from 'antd';

import styles from './NoContent.module.css';

const NoContent = () => {
    return (
        <div className={styles.noContentContainer}>
            <Empty/>
        </div>
    );
};

export default NoContent;
