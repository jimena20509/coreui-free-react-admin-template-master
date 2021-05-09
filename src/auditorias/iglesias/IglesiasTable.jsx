import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';

const IglesiasTable = ({history})=> {

    const refFire = useFirestore();
    const [iglesias, setIglesias] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosIgle = []
            const snapshots = await refFire.collection('iglesias').get();
            snapshots.docs.forEach(snap => {
                datosIgle.push({
                    id: snap.doc.id,
                    ...snap.doc.data()
                })
            })
            setIglesias(datosIgle)
        }

        traerDatos()

    }, [refFire])

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
                            <th>Zona</th>
                            <th>Unión_id</th>
                            <th>Tesorero</th>
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
                                    asociiglesiasaciones.nombre
                                }</td>
                                <td>{
                                    iglesias.codigo
                                }</td>
                                <td>{
                                    iglesias.presidente
                                }</td>
                                <td>{
                                    iglesias.pais
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/iglesias/edit/${iglesias.id}`)
                                    }} className="btn btn-success btn-sm">
                                    </button>
                                    <button className="btn btn-danger btn-sm"> 
                                        <i className="cil-trash"></i>    
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

export default IglesiasTable