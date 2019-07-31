import React from 'react'

function InputText({name, label, type='text', ...rest}){
  return (  
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input type={type}
        name={name} id={name}
        className="form-control" 
        {...rest}
      />    
    </div>
  )
}
 
export default InputText;