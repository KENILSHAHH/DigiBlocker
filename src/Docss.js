import React from 'react'
import aadhar from "./Assets/aadhar.png"
function Docss() {
  return (
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
  );
}

export default Docss