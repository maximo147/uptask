import Swal from "sweetalert2";
import axios from "axios";
import actualizarAvance from '../funciones/avance'

const botonEliminar = document.getElementById('eliminar-proyecto');

if (botonEliminar) {
    botonEliminar.addEventListener('click', (e) => {
        const urlProyecto = e.target.dataset.proyectoUrl;
        console.log('UUUUU', urlProyecto)
        Swal.fire({
            title: 'Desea eliminar este proyecto?',
            text: "Los proyectos no se recuperan una vez eliminados",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar',
            cancelButtonText: 'No, Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                const url = `${location.origin}/proyecto/${urlProyecto}`
                axios.delete(`${url}`)
                    .then(res => {
                        Swal.fire(
                            'Proyecto Eliminado',
                            res.data,
                            'success'
                        );
                        setTimeout(() => {
                            window.location.href = "/";
                        }, 500)
                    })
                    .catch(() => {
                        Swal.fire({
                            type: 'error',
                            title: 'Upps hubo un problema',
                            text: 'No se pudo  eliminar'
                        })
                    });
            }
        })
    })
}



export default botonEliminar

