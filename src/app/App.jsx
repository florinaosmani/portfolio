import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';

import Root from '../pages/Root.jsx';
import Home from '../pages/Home.jsx';
import Documentation from '../pages/Documentation.jsx';
import PromptGenerator from '../pages/PromptGenerator.jsx';
import Poemify from '../features/poemify/Poemify.jsx';
import SelfPortrait from '../pages/SelfPortrait.jsx';
import '../resources/css/app.css';

import { checkIfTouch } from '../features/touchSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={ <Root /> } >
    <Route index element={ <Home /> } />
    <Route path='prompt-generator' element={ <PromptGenerator /> } />
    <Route path='poemify' element={ <Poemify /> } />
    <Route path='documentation' element={ <Documentation /> } />
    <Route path='selfPortrait' element={ <SelfPortrait /> } />
  </Route>
))

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      dispatch(checkIfTouch(isTouch));
  },[]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
