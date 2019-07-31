import React from 'react'

function Select({name, label, data=[], ...rest }){
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
        <select name={name} id={name}
        className="form-control" {...rest}>
        
        <option value='' ></option>                  
        {data.map(c => (
          <option value={c.id} key={c.id}>{c.name}</option>                  
        ))}

      </select>
    </div>
  )
}

export default Select;