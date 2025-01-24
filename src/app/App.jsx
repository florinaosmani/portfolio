import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Root from '../pages/Root';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Documentation from '../pages/documentation/Documentation';
import PromptGenerator from '../features/promptGenerator/PromptGenerator';
import Poemify from '../features/poemify/Poemify';

import '../resources/css/app.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route index element={ <Home /> } />
    <Route path='prompt-generator' element={ <PromptGenerator /> } />
    <Route path='poemify' element={ <Poemify /> } />
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
