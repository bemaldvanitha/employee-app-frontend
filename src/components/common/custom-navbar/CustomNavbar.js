import Link from 'next/link';

import styles from './CustomNavbar.module.css';

const CustomNavbar = () => {
    return (
        <div className={styles.navBar}>
            <div className={styles.navBarHeaderContainer}>
                <Link href="/">
                    <p className={styles.navBarHeader}>Accura Tech</p>
                </Link>
            </div>
            <div className={styles.navBarActionContainer}>
                <Link href="/create">
                    <p className={styles.navBarAction}>Create</p>
                </Link>
            </div>
        </div>
    );
};

export default CustomNavbar;