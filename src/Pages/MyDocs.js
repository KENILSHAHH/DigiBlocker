/** @format */

import React from 'react';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';

import * as eth from '@polybase/eth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth';
import { Auth } from '@polybase/auth';
import { Polybase } from '@polybase/client';

const db = new Polybase({
  defaultNamespace:
    'pk/0x897b08efcd46e4843eb6041fd0ab956864d942bdeb6bcc4fbbef326ca9c2f03b906b3441d5f95b4cdeb475982fb795b97c19b6e363c2edb19b7f6dc5d48cfa2c/DigiBlocker',
});
const collectionReference = db.collection('Docs');
const date = new Date();
const auth = new Auth();
function MyDocs() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const msg = 'Sign to Access your Documents';
    const sig = await auth.ethPersonalSign(msg);
    console.log(sig);
    const publicKey = await ethPersonalSignRecoverPublicKey(sig, msg);
    console.log(publicKey);
    const accounts = await eth.requestAccounts();

    // If there is more than one account, you may wish to ask the user which
    // account they would like to use
    const account = accounts[0];
    console.log(account);
    navigate('/Kenil/Docs');
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
      }}>
      <button
        onClick={handleSubmit}
        className="btn btn-active btn-primary">
        Sign In to access the Documents that you own
      </button>
    </div>
  );
}

export default MyDocs;
