import { useEffect, useState} from 'react';
import { useFirestore } from 'reactfire';
import { Link } from 'react-router-dom';


const Auditorias = () => {

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
                                <th>Editar</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                auditorias.map((audit, index) => (
                                    <tr key ={audit.id}>
                                        <td>{index + 1}</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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