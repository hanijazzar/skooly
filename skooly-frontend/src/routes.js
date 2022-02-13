import React from 'react';

const Home = React.lazy(() => import('./pages/home/Home'));
const Students = React.lazy(() => import('./pages/students/Students'));



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Home', component: Home },
  { path: '/students', name: 'Students', component: Students },

];

export default routes;
