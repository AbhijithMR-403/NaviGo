import React from 'react'
import { Slide, Zoom, toast } from 'react-toastify';

function Toastify() {
  return (
    <div>Toastify</div>
  )
}

export const TError = (message) => {
  console.log(message);
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
}
export const TSuccess = (message) => {
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 3999,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
}
export const TInfo = (message) => {
  toast.info(`${message}`, {
    position: "top-center",
    autoClose: 3999,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
}
export const TWarning = (message) => {
  toast.warn(`${message}`, {
    position: "top-center",
    autoClose: 3999,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Zoom,
  });
}

export default Toastify