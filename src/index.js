import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import Form from './Form';
import LoginForm from './Login';
import Protected from './Protected';
import SignupForm from './Signup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/login' element={<LoginForm />}></Route>
      <Route path='/signup' element={<SignupForm />}></Route>
      <Route path='/' element={<Protected />}>
        <Route path='/' index element={<Form />} />
      </Route >
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}></RouterProvider>
);
