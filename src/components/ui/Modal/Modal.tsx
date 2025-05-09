import { useEffect, useState, type ChangeEvent, type FC, type FormEvent } from "react"
import { tareaStore } from "../../../store/tareaStore"
import styles from "./Modal.module.css"
import type { ITarea } from "../../../types/ITarea"
import useTareas from "../../../hooks/useTareas"

type Props = {
    handleCloseModal: VoidFunction
}
const initalState: ITarea = {
    titulo: "",
    descripcion: " ",
    fechaLimite: " "
}

const Modal: FC<Props> = ({ handleCloseModal }) => {
    const tareaActiva = tareaStore((state) => state.tareaActiva)
    const setTareaActiva = tareaStore((state) => state.setTareaActiva)
    const [formValues, setFormValues] = useState<ITarea>(initalState)

    const { createTarea, putTarea } = useTareas()

    useEffect(() => {
        if (tareaActiva) {
            setFormValues(tareaActiva)
        }
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormValues((prev) => ({ ...prev, [`${name}`]: value }))
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (tareaActiva) {
            putTarea(formValues)
        } else {
            createTarea({ ...formValues, id: new Date().toDateString() })
        }

        handleCloseModal()
        setTareaActiva(null)
    }

    return (
        <div className={styles.modalContainer}>
            <div className={styles.modalContent}>
                <button onClick={handleCloseModal}>x</button>

                <div>
                    <h3>{tareaActiva ? "Editar tarea" : "Crear Tarea"}</h3>
                </div>
                <form className={styles.formContainer} onSubmit={handleSubmit}>
                    <div className={styles.inputsContainer}>
                        <input onChange={handleChange} placeholder="Titulo" type="text" required name='titulo' value={formValues.titulo} />
                        <textarea required name="descripcion" onChange={handleChange} placeholder="Descripcion" value={formValues.descripcion} />
                        <input type="date" required name='fechaLimite' onChange={handleChange} value={formValues.fechaLimite} />
                    </div>
                    <div className={styles.buttonsContainer}>
                        <button onClick={handleCloseModal}>Cancelar</button>
                        <button type="submit">{tareaActiva ? "Guardar Cambios" : "Crear"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Modal