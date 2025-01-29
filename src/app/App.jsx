import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Home from '../pages/Home.jsx';
import Documentation from '../pages/documentation/Documentation.jsx';
import PromptGenerator from '../pages/PromptGenerator.jsx';
import Poemify from '../pages/Poemify.jsx';

import '../resources/css/app.css';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route index element={ <Home /> } />
    <Route path='prompt-generator' element={ <PromptGenerator /> } />
    <Route path='poemify' element={ <Poemify /> } />
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
