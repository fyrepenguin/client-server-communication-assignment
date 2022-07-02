import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Layout from './components/Layout';
import RequireAuth from './components/RequireAuth';
import NotFound from './components/NotFound';
import './App.css'

function App() {
  return (
    <div>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App;
