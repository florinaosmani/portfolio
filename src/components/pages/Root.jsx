import { Outlet } from 'react-router-dom';

import '../../resources/css/pages/root.css';

import Header from '../../features/header/Header.jsx';
import Footer from '../components/Footer';

function Root() {

    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Root;