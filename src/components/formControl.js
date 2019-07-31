import React from 'react'

class FormControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      data: {},
      radio: {},
      checkbox: {},
      errors: {}
    }

    this.handleChangeText = this.handleChangeText.bind(this)
    this.handleChangeRadio = this.handleChangeRadio.bind(this)
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this)
  }

  handleChangeText({ currentTarget: input }){
    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data })
  }

  handleChangeRadio({ currentTarget: input }){
    const radio = { ...this.state.radio }
    radio[input.name] = input.value

    this.setState({ radio })
  }

  handleChangeCheckbox({ currentTarget: input }){
    const checkbox = { ...this.state.checkbox }
    const isAlready = checkbox[input.name].find(c => c === input.value)

    if(isAlready === undefined){
      checkbox[input.name] = [input.value, ...checkbox[input.name]]
    } else {
      checkbox[input.name] = checkbox[input.name].filter(c => c !== input.value)
    }

    this.setState({ checkbox })
  }

}
 
export default FormControl;