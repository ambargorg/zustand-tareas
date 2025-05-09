import { useShallow } from "zustand/shallow"
import { tareaStore } from "../store/tareaStore"
import { editarTarea, getAllTareas, postNuevaTarea, eliminarTareaPorID } from "../http/tareas"
import type { ITarea } from "../types/ITarea"
import Swal from "sweetalert2"

const useTareas = () => {

    const { tareas, setArrayTareas, agregarNuevaTarea, eliminarUnaTarea } = tareaStore(useShallow((state) => ({
        tareas: state.tareas,
        setArrayTareas: state.setArrayTareas,
        agregarNuevaTarea: state.agregarNuevaTarea,
        eliminarUnaTarea: state.eliminarUnaTarea,
        editarTarea: state.editarTarea
    })))

    const getTareas = async () => {
        const data = await getAllTareas()
        if (data) setArrayTareas(data)
    }

    const createTarea = async (nuevaTarea: ITarea) => {
        agregarNuevaTarea(nuevaTarea)
        try {
            await postNuevaTarea(nuevaTarea)
            Swal.fire("Exito", "Tarea Creada Correctamente", "success")
        } catch (error) {
            eliminarUnaTarea(nuevaTarea.id!)
            console.log('Algo salio mal')
        }
    }

    const putTarea = async (tareaEditada: ITarea) => {
        const estadoPrevio = tareas.find((el) => el.id === tareaEditada.id)
        editarTarea(tareaEditada)

        try {
            await editarTarea(tareaEditada)
            Swal.fire("Exito", "Tarea Editada Correctamente", "success")

        } catch (error) {
            if (estadoPrevio) editarTarea(estadoPrevio)
            console.log('No se pudo editar la tarea')
        }
    }

    const eliminarTarea = async (idTarea: string) => {
        const estadoPrevio = tareas.find((el) => el.id === idTarea)
        const confirm = await Swal.fire({
            title: '¿Estas seguro?',
            text: 'No podrás recuperar la tarea eliminada',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#bb3c15',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#8f8f8f',
        })
        if(!confirm.isConfirmed) return;
        eliminarUnaTarea(idTarea)
        try {
            await eliminarTareaPorID(idTarea)
            Swal.fire("Exito", "Tarea Eliminada Correctamente", "success")
        } catch (error) {
            if (estadoPrevio) agregarNuevaTarea(estadoPrevio)
            console.log("Algo salio mal al eliminar la tarea")
        }
    }

    return {
        tareas,
        getTareas,
        createTarea,
        putTarea,
        eliminarTarea
    }
}

export default useTareas