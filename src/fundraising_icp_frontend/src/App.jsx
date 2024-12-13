// src/App.jsx
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routers/AppRouter.jsx';

const App = () => <RouterProvider router={router} />;

export default App;
