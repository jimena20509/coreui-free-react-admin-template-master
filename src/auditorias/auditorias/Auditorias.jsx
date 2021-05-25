import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';


const Auditorias = ({history}) => {

    const refFire = useFirestore();
    const [auditorias, setAuditorias] = useState([])

    useEffect(() =>{
        const traerDatos = async () => {
            const temporales = []
            const snapshot = await refFire.collection('auditorias').get()
            snapshot.docs.forEach((doc)=>{
                const elem = {
                    id: doc.id,
                    ...doc.data()
                }
                temporales.push(elem)
            })
            setAuditorias(temporales)
        } 

        traerDatos()
    }, [refFire])
    
    const eliminar = async (id) => {
        const respuesta = window.confirm('Seguro que quiere eliminar?');
        if (respuesta) {
            await refFire.collection('auditorias').doc(id).delete();
            toast('Eliminado')
            const temp = auditorias.filter((auditorias)=> {
                console.log(auditorias, id)
                return auditorias.id !== id
            })
            setAuditorias(temp)
            
        }
    }

    const setActual = async(id) => {
        await refFire.collection('auditorias').doc(id).update({actual: true})
        console.log('Actualizado')
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Auditoria </h2>
                <Link className="btn btn-primary" to="/auditorias/add">Crear</Link>

                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Nro</th>
                                <th>Fecha</th>
                                <th>Iglesia</th>
                                <th>Actual</th>
                                <th>Activo</th>
                                <th>Editar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                auditorias.map((audit, index) => (
                                    <tr key ={audit.id}>
                                        <td>{index + 1}</td>
                                        <td>{audit.fecha}</td>
                                        <td>{audit.iglesia.nombre}</td>
                                        <td>
                                            {audit.actual } 
                                            ?
                                                'Actual'
                                            :
                                            <button onClick={()=> setActual(audit.id)} className="btn  btn-primary btn-xm" >
                                                Poner como actual
                                            </button>

                                        </td>
                                        <td>{audit.activo ? 'Si' : 'No'}</td>
                                        <td>
                                            <button onClick={ () => {
                                                history.push(`/auditorias/edit/${audit.id}`)
                                            }} 
                                            className="btn btn-success btn-sm">
                                                <i className ="cil-peniel"></i>
                                            </button>
                                            <button onClick={() => eliminar(audit.id)} className="btn btn-danger btn-sm"> 
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

export default Auditorias;