import React from 'react';
import { Link } from 'react-router-dom';

export default function homepage() {
  return (
    <div>
      <div className='jumbotron my-4'>
        <h1 className='display-4'>Welcome!</h1>
        <p className='lead'>This is a simple credit transfer app.</p>
        <hr className='my-4' />
        <p>Made by Samriddhi Jain.</p>
        <Link to={'/users'} className='btn btn-primary btn-lg'>
          Get started
        </Link>
      </div>
    </div>
  );
}
