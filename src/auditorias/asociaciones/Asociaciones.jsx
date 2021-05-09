import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom';
import AddEditUnion from './AddEditUnion';
import AsociacionesTable from './AsociacionesTable';
import AddEditAsociaciones from './AddEditAsociaciones';

const Asociaciones = ({history})=> {

    const refFire = useFirestore();


    return (
        <Switch>
            <Route exact path="/asociaciones">
                <AsociacionesTable />
            </Route>
            <Route path="/asociaciones/add">
                <AddEditAsociaciones />
            </Route>
            <Route path="/asociaciones/edit/:id">
                <AddEditAsociaciones />
            </Route>
        </Switch>
    )
}

export default Asociaciones