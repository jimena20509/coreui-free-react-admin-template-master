import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Distritos = ({history})=> {

    const refFire = useFirestore();
    const [distritos, setDistritos] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosDistritos = []
            const snapshots = await refFire.collection('distritos').get();
            snapshots.docs.forEach(snap => {
                datosDistritos.push({
                    id: snap.id,
                    ...snap.data()
                })
            })
            setDistritos(datosDistritos)
        }

        traerDatos()

    }, [refFire])


    const eliminar = async (id) => {
        const respuesta = window.confirm('Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('distritos').doc(id).delete();
            toast('Eliminado')
            const temp = distritos.filter((Distrito)=> {
                console.log(distritos, id)
                return distritos.id !== id
            })
            setDistritos(temp)
            
        }
    }

    return (
        <div className="card">
            <div className="card-body">

                <h2 className="card-title">Distritos</h2>
                <Link className="btn btn-primary" to="/distritos/add">Crear</Link>
                <table className="table table-sn">
                    <thead>
                        <tr>
                            <th>Nro</th>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Zona</th>
                            <th>Asociación_id</th>
                            <th>Pastor</th>
                            <th>Tesorero</th>
                            <th>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        distritos.map((distritos, index)=> (
                            <tr key={distritos.id}>
                                <td>{
                                    index + 1
                                }</td>
                                <td>{
                                    distritos.nombre
                                }</td>
                                <td>{
                                    distritos.codigo
                                }</td>
                                <td>{
                                    distritos.zona
                                }</td>
                                <td>{
                                    distritos.asociacion_id
                                }</td>
                                <td>{
                                    distritos.pastor
                                }</td>
                                <td>{
                                    distritos.tesorero
                                }</td>
                                <td>
                                    <button onClick={ () => {
                                        history.push(`/distritos/edit/${distritos.id}`)
                                    }} 
                                    className="btn btn-success btn-sm">
                                        <i className ="cil-peniel"></i>
                                    </button>
                                    <button onClick={() => eliminar(distritos.id)} className="btn btn-danger btn-sm"> 
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

export default Distritos