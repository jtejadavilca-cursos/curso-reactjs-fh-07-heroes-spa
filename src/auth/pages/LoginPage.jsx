import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context';

export const LoginPage = () => {

  const { login } = useContext( AuthContext );
  const navigate = useNavigate();

  const onSetUser = () => {
    login( 'José Tejada' );

    const lastPath = localStorage.getItem('lastPath') || '/';

    navigate( lastPath, { replace: true } );
  }

  return (
    <div className='container-fluid'>
      <h1>LoginPage</h1>
      <hr />

      <div className="container mt-10">

        <button
          className="btn btn-outline-primary"
          onClick={ onSetUser }
        >
          Enter
        </button>
      </div>
    </div>
  )
}
