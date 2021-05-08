import React from 'react';


const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Users = React.lazy(() => import('../views/users/Users'));
const User = React.lazy(() => import('../views/users/User'));
const Iglesias = React.lazy(() => import('./iglesias/Iglesias'));
const AddEditIglesia = React.lazy(() => import('./iglesias/AddEditIglesia'));
const AddEditUnion = React.lazy(() => import('./Uniones/AddEditUnion'));
const Uniones = React.lazy(() => import('./Uniones/Uniones'));
const UnionesTable = React.lazy(() => import('./Uniones/UnionesTable'));

const routes = [
  { path: '/', exact: true, name: 'Inico' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },
  { path: '/iglesias', exact: true, name: 'Iglesias', component: Iglesias },
  { path: '/iglesias/add', exact: true, name: 'Añadir Iglesias', component: AddEditIglesia },
  { path: '/uniones', exact: true, name: 'Uniones', component: Uniones },
  { path: '/uniones/add', exact: true, name: 'Añadir Unión', component: AddEditUnion },
  { path: '/uniones/edit/:id', exact: true, name: 'Editar Unión', component: UnionesTable }
];

export default routes;
