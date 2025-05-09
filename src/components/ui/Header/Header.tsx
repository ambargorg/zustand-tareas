type Props = {}
import styles from "./Header.module.css"

const Header = (props: Props) => {
    return (
        <div className={styles.containerHeader}>
            <div className={styles.containerTitleHeader}>
                <h2>Aplicacion de Tareas</h2>
            </div>
        </div>
    )
}

export default Header