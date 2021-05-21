import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore';
import { Link } from 'react-router-dom';

const AsociacionesTable = ({history})=> {

    const refFire = useFirestore();
    const [asociaciones, setAsociaciones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosAsociaciones = []
            const snapshots = await refFire.collection('asociaciones').get();
            snapshots.docs.forEach(snap => {
                datosAsociaciones.push({
                    id: snap.doc.id,
                    ...snap.doc.data()
                })
            })
            setAsociaciones(datosAsociaciones)
        }

        traerDatos()

    }, [refFire])

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
                        asociaciones.map((asociaciones, index)=> (
                            <tr key={asociaciones.id}>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    asociaciones.nombre
                                }</td>
                                <td>{
                                    asociaciones.codigo
                                }</td>
                                <td>{
                                    asociaciones.presidente
                                }</td>
                                <td>{
                                    asociaciones.pais
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/asociaciones/edit/${asociaciones.id}`)
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

export default AsociacionesTable