import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom';
import AddEditDistritos from './AddEditDistritos';

const Distritos = ({history})=> {

    const refFire = useFirestore();


    return (
        <Switch>
            <Route exact path="/distritos">
                <DistritosTable />
            </Route>
            <Route path="/distritos/add">
                <AddEditDistritos />
            </Route>
            <Route path="/distritos/edit/:id">
                <AddEditDistritos />
            </Route>
        </Switch>
    )
}

export default Distritos
