import React from 'react'

function InputField() {
  return (
    <div>
        <input
    className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outline ${darkMode
        ? "bg-[#302E30] text-white focus:border-white"
        : "bg-gray-100 text-black focus:border-black"
        }`}
    type="email"
    value={email}
    onChange={(e) => setemail(e.target.value)}
    placeholder="Enter your email"
    name='email'
/></div>
  )
}

export default InputField