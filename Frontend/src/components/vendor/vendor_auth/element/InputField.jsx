import React from 'react'

function InputField({ type, placeholder, name, value, setValue }) {
  return (
    <div>
      <input
        className={`w-full px-5 py-3 rounded-lg  font-medium border-2 border-transparent placeholder-gray-500 text-sm focus:outline-none focus:border-2  focus:outlinebg-[#302E30] bg-gray-100 text-black focus:border-black`}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        name={name}
      /></div>
  )
}

export default InputField