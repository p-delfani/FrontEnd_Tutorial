import Courses from './components/Courses'
import MainCourse from './components/MainCourse'
import About from './components/About/About'
import Login from './components/Login'
import Panel from './components/Panel'
import Dashboard from './components/Dashboard'
import PrivateRoute from './components/PrivateRoute'

let routes = [

    { path: '/courses', element: < Courses /> },
    { path: '/course/:courseID', element: <MainCourse /> },

    {
        path: '/about/*', element: < About />, children: [
            { path: "setting", element: < p style={{ textAlign: 'center' }}> Setting</p > },
            { path: "dashboard", element: <p style={{ textAlign: 'center' }}>Dashboard</p> }
        ]
    },
    { path: '/login', element: <Login /> },
    {
        path: '/*', element: <PrivateRoute />, children: [
            { path: 'panel', element: <Panel /> },
            { path: 'dashboard', element: <Dashboard /> },

        ]
    },
]

export default routes