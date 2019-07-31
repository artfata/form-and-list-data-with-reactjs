import React from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { Route, Switch, Redirect, NavLink } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import GetData from './pages/getData'
import CreateData from './pages/createData'

function App() {
  return (
    <div className='container-fluid'>
      <ToastContainer />

      {/* button nav */}
      <div className='mt-3'>
        <div className='d-flex justify-content-center'>
          <NavLink to='/get-data'>
            <button className='btn btn-primary mr-2'>
              get data
            </button>
          </NavLink>
          <NavLink to='/create-data'>
            <button className='btn btn-primary ml-2'>
              create data
            </button>
          </NavLink>
        </div>
      </div>

      {/* router */}
      <Switch>
        <Route path='/create-data' component={CreateData} />
        <Route path='/get-data' component={GetData} />
        <Redirect to='/create-data' />
      </Switch>

    </div>
  );
}

export default App;