/** @format */

import React from 'react';
import aadhar from './Assets/aadhar.png';
import aadharr from './Assets/aadharr.png';
function Docss() {
  return (
    <div>
      {' '}
      <h1 style={{ marginTop: '50px', marginLeft: '50px', fontSize: '35px' }}>
        Your Owned Documents
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '150px',
        }}>
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">374568212509</h2>
            <p>Adarsh Kumar </p>
          </div>
          <figure>
            <img
              src={aadhar}
              alt="Shoes"
            />
          </figure>
        </div>
        <div
          style={{ marginLeft: '50px' }}
          className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">9147385602</h2>
            <p>Priyanka </p>
          </div>
          <figure>
            <img
              src={aadharr}
              alt="Shoes"
            />
          </figure>
        </div>
      </div>
    </div>
  );
}

export default Docss;
