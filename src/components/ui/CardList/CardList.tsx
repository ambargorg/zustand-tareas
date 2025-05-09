import type { FC } from "react"
import type { ITarea } from "../../../types/ITarea"
import styles from "./CardList.module.css"
import { FaTrash, FaPen } from "react-icons/fa";
import useTareas from "../../../hooks/useTareas";
type ICardList = {
    tarea: ITarea,
    handleOpenModal: (tarea:ITarea)=> void,
}

const CardList: FC<ICardList> = ({ tarea, handleOpenModal }) => {
    const {eliminarTarea}= useTareas()

    const eliminarTareaByID = () =>{
        eliminarTarea(tarea.id!)
    }
    const editarTarea = () =>{ 
        handleOpenModal(tarea)
    }

    return (
        <div className={styles.cardContainer}>
            <div className={styles.infoContainer}>
                <h3>{tarea.titulo}</h3>
                <p>{tarea.descripcion}</p>
                <p><b>Fecha Limite: {tarea.fechaLimite}</b></p>
            </div>
            <div className={styles.buttonsContainer}>
                <button onClick={eliminarTareaByID}><FaTrash color="#aa1212"/></button>
                <button onClick={editarTarea}><FaPen /></button>
            </div>
        </div>
    )
}

export default CardList