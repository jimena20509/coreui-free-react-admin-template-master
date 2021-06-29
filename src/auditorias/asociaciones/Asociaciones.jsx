import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaTrash} from 'react-icons/fa';

const Asociaciones = ({history})=> {

    const refFire = useFirestore();
    const [asociaciones, setAsociaciones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosAsociaciones = []
            const snapshots = await refFire.collection('asociaciones').get();
            snapshots.docs.forEach(snap => {
                datosAsociaciones.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setAsociaciones(datosAsociaciones)
        }

        traerDatos()

    }, [refFire])


    const eliminar = async (id) => {
        const respuesta = window.confirm('Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('asociaciones').doc(id).delete();
            toast('Eliminado')
            const temp = asociaciones.filter((asoci)=> {
                console.log(asoci, id)
                return asoci.id !== id
            })
            setAsociaciones(temp)
            
        }
    }

    return (
        <div className="card">
            <div className="card-body">

                <h2 className="card-title">Asociaciones</h2>
                <Link className="btn btn-primary" to="/asociaciones/add">Crear</Link>
                <table className="table table-sn">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Zona</th>
                            <th>Unión_id</th>
                            <th>Tesorero</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        asociaciones.map((asoci, index)=> (
                            <tr key={asoci.id}>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    asoci.nombre
                                }</td>
                                <td>{
                                    asoci.codigo
                                }</td>
                                <td>{
                                    asoci.zona
                                }</td>
                                <td>{
                                    asoci.union_id
                                }</td>
                                <td>{
                                    asoci.tesorero
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/asociaciones/edit/${asoci.id}`)
                                    }} 
                                    className="btn btn-success btn-sm">
                                        <FaPen />
                                    </button>
                                    <button onClick={() => eliminar(asoci.id)} className="btn btn-danger btn-sm"> 
                                        <FaTrash />    
                                    </button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Asociaciones