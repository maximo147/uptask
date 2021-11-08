import Swal from "sweetalert2";


const actualizarAvance = () => {
    //Seleccionar tareas
    const tareas = document.querySelectorAll('.tarea');
    if(tareas.length > 0){
        const tareasTotal = tareas.length;
        const tareasCompletas = document.querySelectorAll('.completo');
        const barra = document.getElementById('porcentaje');
        const porcentaje = tareasCompletas.length * 100 / tareasTotal;
        barra.style.width = porcentaje+'%'
        if(porcentaje === 100){
            Swal.fire({
                title: "Terminaste las tareas",
                text: "Que bien, poco a poco se consigue el mundo",
                type: "success"
            })
        }
    }
}


export default actualizarAvance