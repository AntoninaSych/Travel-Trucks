import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>TravelTrucks</div>
            <nav className={styles.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? styles.active : '')}>
                    Home
                </NavLink>
                <NavLink
                    to="/catalog"
                    className={({ isActive }) => (isActive ? styles.active : '')}>
                    Catalog
                </NavLink>
            </nav>
        </header>
    );
};

export default Header;
