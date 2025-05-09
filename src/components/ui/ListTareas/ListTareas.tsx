import { useEffect, useState } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./ListTareas.module.css"
import { getAllTareas } from "../../../http/tareas"
import CardList from "../CardList/CardList"
import Modal from "../Modal/Modal"
import type { ITarea } from "../../../types/ITarea"
import useTareas from "../../../hooks/useTareas"


const ListTareas = () => {
    const [openModalTarea, setOpenModalTarea] = useState(false)
    const { getTareas, tareas } = useTareas()
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)

    useEffect(() => {
        getTareas()
    }, [])


    const handleOpenModalEdit = (tarea: ITarea) => {
        setTareaActiva(tarea)
        setOpenModalTarea(true);
    }

    const handleCloseModal = () => {
        setOpenModalTarea(false)
    }

    return (
        <>
            <div className={styles.containerPrincipalListTareas}>
                <div className={styles.containerTitleAndButton}>
                    <h2>Tus Tareas</h2>
                    <button className={styles.agregarTarea} onClick={() => setOpenModalTarea(true)}>Agregar Tarea +</button>
                </div>
                <div className={styles.containerList}>
                    {tareas.length > 0 ?
                        tareas.map((el) => <CardList handleOpenModal={handleOpenModalEdit} tarea={el} />)
                        :
                        <div>
                            <h3>Aun no hay tareas</h3>
                        </div>
                    }
                </div>
            </div>
            {openModalTarea && <Modal handleCloseModal={handleCloseModal} />}
        </>
    )
}

export default ListTareas