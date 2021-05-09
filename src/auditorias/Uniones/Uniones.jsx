import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom';
import UnionesTable from './UnionesTable';
import AddEditUnion from './AddEditUnion';

const Uniones = ({history})=> {

    const refFire = useFirestore();


    return (
        <Switch>
            <Route exact path="/uniones">
                <UnionesTable />
            </Route>
            <Route path="/uniones/add">
                <AddEditUnion />
            </Route>
            <Route path="/uniones/edit/:id">
                <AddEditUnion />
            </Route>
        </Switch>
    )
}

export default Uniones
