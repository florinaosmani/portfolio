import { Outlet } from 'react-router-dom';

import '../resources/css/pages/root.css';

import Header from '../features/header/Header.jsx';

function Root() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    )
}

export default Root;