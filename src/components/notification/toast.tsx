import React from 'react';

const Toast = ({ message = "", type = 'info' }) => (
    <div className="toast fixed top-5 right-4 p-4 rounded-md shadow-md flex bg-white" role="alert" aria-live="assertive" aria-atomic="true">
        <div className="flex items-center">
            <div className="text-sm text-gray-600">This is a toast message.</div>
        </div>
        <button type="button" className="ml-auto -mr-2 rounded-md p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    </div>
);

export default Toast;
