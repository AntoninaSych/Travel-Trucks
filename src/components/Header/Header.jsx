import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                Travel<span>Trucks</span>
            </div>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    end
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/catalog"
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                >
                    Catalog
                </NavLink>

            </nav>
        </header>
    );
};

export default Header;
