import React, { useState } from 'react'

function InputField(props) {
  const [ShowPassword, setShowPassword] = useState(true)
  return (
    <div className='mb-4' key={props.name}>
        <div className="flex-column mb-2">
        <label > {props.name}</label></div>
        <div className="inputForm">
          {props.Icon? <props.Icon />:<></>}
            <input type={ShowPassword? props.type: 'text'} className="input" placeholder={props.placeholder} name={props.formName}/>
           
            {props.EyeIcon? <div className='cursor-pointer' onClick={()=>setShowPassword((res)=>!res)}><props.EyeIcon /></div>:<></>}
        </div>
    </div>
  )
}

export default InputField