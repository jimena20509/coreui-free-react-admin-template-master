import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPen, FaTrash} from 'react-icons/fa';

const Iglesias = ({history})=> {

    const refFire = useFirestore();
    const [iglesias, setIglesias] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosIglesias = []
            const snapshots = await refFire.collection('iglesias').get();
            snapshots.docs.forEach(snap => {
                datosIglesias.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setIglesias(datosIglesias)
        }

        traerDatos()

    }, [refFire])


    const eliminar = async (id) => {
        const respuesta = window.confirm('Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('iglesias').doc(id).delete();
            toast('Eliminado')
            const temp = iglesias.filter((iglesias)=> {
                console.log(iglesias, id)
                return iglesias.id !== id
            })
            setIglesias(temp)
            
        }
    }

    return (
        <div className="card">
            <div className="card-body">

                <h2 className="card-title">Iglesias</h2>
                <Link className="btn btn-primary" to="/iglesias/add">Crear</Link>
                <table className="table table-sn">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Distrito_id</th>
                            <th>Tipo</th>
                            <th>Zona</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        iglesias.map((iglesias, index)=> (
                            <tr key={iglesias.id}>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    iglesias.nombre
                                }</td>
                                <td>{
                                    iglesias.codigo
                                }</td>
                                <td>{
                                    iglesias.distrito_id
                                }</td>
                                <td>{
                                    iglesias.tipo
                                }</td>
                                <td>{
                                    iglesias.zona
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/iglesias/edit/${iglesias.id}`)
                                    }} 
                                    className="btn btn-success btn-sm">
                                        <FaPen />
                                    </button>
                                    <button onClick={() => eliminar(iglesias.id)} className="btn btn-danger btn-sm"> 
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

export default Iglesias