import { useEffect, useState} from 'react'
import { useFirestore } from 'reactfire'


const Auditorias = () => {

    const reFirestore = useFirestore();

    useEffect(() =>{
        const traerDatos = async () => {
            const temporales = []
            const snapshot = await useFirestore.collection('auditorias').get
            snapshot.docs.forEach((doc)=>{
                const elem = {
                    doc.id,
                    ...doc.data()
                }
            })

        }
    }, [])

    return (
        <div className="card">
            <div className="card-body">
                <h2 className="card-title">Uniones</h2>

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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
    )
}

export default Auditorias;