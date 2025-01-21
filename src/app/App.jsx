import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Root from '../components/pages/Root';
import Home from '../components/pages/Home';
import Projects from '../components/pages/Projects';
import Contact from '../components/pages/Contact';
import Documentation from '../components/pages/Documentation';

import '../resources/css/app.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route index element={ <Home /> } />
    <Route path='projects' element={ <Projects /> } />
    <Route path='contact' element={ <Contact /> } />
    <Route path='documentation' element={ <Documentation /> } />
  </Route>
))
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
