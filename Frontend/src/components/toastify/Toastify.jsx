import React from 'react'
import { Bounce, Slide, Zoom, toast } from 'react-toastify';

function Toastify() {
  return (
    <div>Toastify</div>
  )
}

export const TError = (message) => {
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


export const TOwnerError = (message) => {
  toast.error(`${message}`, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
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
    autoClose: 1999,
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


export const TPromise = (message) => {
  toast.success(`${message}`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
  });
}

export const TUpdate = (id, message, type) => {
  toast.update(id, { render: message, type: type, isLoading: false, progress: undefined, closeOnClick: true, autoClose: 5000, });
}

export const TLoading = (message) => {
  return toast.loading(message, { closeOnClick: true, autoClose: 5000, });
}

export default Toastify