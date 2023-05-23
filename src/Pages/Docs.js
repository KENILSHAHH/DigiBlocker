/** @format */
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import React from 'react';
import * as eth from '@polybase/eth';
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

function Docs() {
  const [formInput, setFormInput] = useState({
    name: '',

    docs: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPreviewURL(URL.createObjectURL(event.target.files[0]));
  };
  const handleFileChangee = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    console.log(formInput.docs);
    event.preventDefault();
    const msg = 'Sign to Store your Document';
    const sig = await auth.ethPersonalSign(msg);
    console.log(sig);
    const publicKey = await ethPersonalSignRecoverPublicKey(sig, msg);
    console.log(publicKey);
    const accounts = await eth.requestAccounts();

    // If there is more than one account, you may wish to ask the user which
    // account they would like to use
    const account = accounts[0];
    console.log(account);
    db.signer(async (data) => {
      const accounts = await eth.requestAccounts();

      // If there is more than one account, you may wish to ask the user which
      // account they would like to use
      const account = accounts[0];
      console.log(account);
      const sig = await eth.sign(data, account);

      return { h: 'eth-personal-sign', sig };
    });
    await db
      .collection('Docs')
      .create([
        date + '',
        formInput.docs,
        'https://ipfs.io/ipfs/QmUkt9LhCpgP92hraygZAUXzDmkGUys3hvpQkjWcqTxq8A?filename=Screenshot%202023-05-23%20160027.png',
      ]);
    alert('Done');
  };
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '185px',
      }}>
      <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <form
          class="space-y-6"
          action="#">
          <h5 class="text-xl font-medium text-gray-900 dark:text-white">
            Upload your document details
          </h5>
          {previewURL ? (
            <div>
              <h3>Your Docs</h3>
              <img
                src={previewURL}
                alt="Preview"
                style={{ maxWidth: '100%' }}
              />
            </div>
          ) : (
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900">
                Cover photo
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="previewUrl"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                      <span>Upload a file</span>
                      <input
                        id="previewUrl"
                        name="previewUrl"
                        type="file"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          )}

          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Document Number
            </label>
            <input
              type="docs"
              name="docs"
              id="docs"
              onChange={handleFileChangee}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="MYRP....53G"
              required
            />
          </div>

          <div>
            <label
              for="name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="name"
              name="name"
              id="name"
              onChange={handleFileChangee}
              placeholder="John"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Secure your docs now!
          </button>
        </form>
      </div>
    </div>
  );
}

export default Docs;
