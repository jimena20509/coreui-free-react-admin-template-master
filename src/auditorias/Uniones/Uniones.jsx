import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Link, Route, Switch } from 'react-router-dom';
import UnionesTable from './UnionesTable';

const Uniones = ({history})=> {

    const refFire = useFirestore();
    const [uniones, setUniones] = useState([])


    useEffect(() => {

        const traerDatos = async () => {
            const datosUniones = []
            const snapshots = await refFire.collection('uniones').get();
            snapshots.docs.forEach(snap => {
                datosUniones.push({
                    id: snap.doc.id,
                    ...snap.doc.data()
                })
            })
            setUniones(datosUniones)
        }

        traerDatos()

    }, [refFire])

    return (
        <Switch>
            <Route path="uniones">
                <UnionesTable />
            </Route>
        </Switch>
    )
}

export default Uniones
