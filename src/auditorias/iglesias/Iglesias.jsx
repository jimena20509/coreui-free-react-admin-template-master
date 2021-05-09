import { useFirestore } from 'reactfire'
import { useEffect, useState } from 'react'
import 'firebase/firestore'
import { Route, Switch } from 'react-router-dom';
import IglesiasTable from './IglesiasTable';
import AddEdditIglesia from './AddEditIglesia';

const Iglesias = ({history})=> {

    const refFire = useFirestore();


    return (
        <Switch>
            <Route exact path="/iglesias">
                <IglesiasTable />
            </Route>
            <Route path="/iglesias/add">
                <AddEdditIglesia />
            </Route>
            <Route path="/iglesias/edit/:id">
                <AddEdditIglesia />
            </Route>
        </Switch>
    )
}

export default Iglesias