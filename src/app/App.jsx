import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Root from '../pages/Root';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Documentation from '../pages/Documentation/Documentation';

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
