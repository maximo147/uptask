import axios from 'axios'
import Swal from 'sweetalert2';
import actualizarAvance from '../funciones/avance'

var estadoTarea = document.getElementsByClassName('estado-tarea');
var eliminar = document.getElementsByClassName('eliminar');
if (estadoTarea) {
    for (var i = 0; i < estadoTarea.length; i++) {
        estadoTarea[i].addEventListener('click', (e) => {
            const url = e.target.dataset.estadoTarea;
            const estado = e.target.dataset.estado;
            const url_proyecto = e.target.dataset.url;

            axios.put(`${location.protocol}${url}`, { estado, url_proyecto })
                .then(data => {
                    if (data.status === 200) {
                        actualizarAvance()
                        location.reload();
                        
                        //estadoTarea[i].classList.toggle("completo");
                    }
                })
                .catch((error) => console.log(error))
        })
    }

}

if (eliminar) {
    for (var i = 0; i < eliminar.length; i++) {
        eliminar[i].addEventListener('click', (e) => {
            const url = e.target.dataset.estadoTarea;
            const estado = e.target.dataset.estado;
            const url_proyecto = e.target.dataset.url;
            Swal.fire({
                title: "Deseas borrar tarea?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, borrar",
                cancelButtonText: "No, cancelar"
            }).then((result) => {
                if (result.value) {
                    axios.delete(`${location.protocol}${url}`)
                        .then(data => {
                            if (data.status === 201) {
                                location.reload();
                            }
                        })
                        .catch(error => console.log(error))
                }
            })

        });
    }
}

export default estadoTarea;