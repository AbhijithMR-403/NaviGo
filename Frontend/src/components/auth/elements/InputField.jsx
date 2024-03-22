import React from 'react'

function InputField(props) {
  return (
    <div className='mb-4' key={props.name}>
        <div className="flex-column mb-2">
        <label > {props.name}</label></div>
        <div className="inputForm">
          {props.Icon? <props.Icon />:<></>}
            <input type={props.type} className="input" placeholder={props.placeholder} name={props.formName}/>
           
            {props.EyeIcon? <props.EyeIcon />:<></>}
        </div>
    </div>
  )
}

export default InputField