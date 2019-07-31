import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import FormControl from '../components/formControl'
import InputText from '../components/inputText'
import Select from '../components/select'
import TextArea from '../components/textarea'
import Radio from '../components/radio'
import config from '../config'

class CreateData extends FormControl {
  constructor(props) {
    super(props);
    this.state = { 
      data: {
        full_name: '', place_of_birth_id: '',
        date_of_birth: '', phone_number: '',
        address: '', last_education: ''
      },
      radio: {religion: ''},
      checkbox: {hobbies: []},
      cities: [],
      education: [
        {id: 'SD', name: 'SD'},
        {id: 'SMP', name: 'SMP'},
        {id: 'SMA', name: 'SMA'},
        {id: 'S1', name: 'S1'}
      ],
      religion: [
        {name: 'Islam'},
        {name: 'Kristen'},
        {name: 'Katolik'}
      ],
      hobbies: []
    }

    this._doSubmit = this._doSubmit.bind(this)

  }

  _populateCities(){
    axios.get(`${config.getCities}`)
      .then(res => {
        this.setState({ cities: res.data })    
      }).catch(ex => {
        toast.warn('ups, tidak bisa menampilkan kota')
      })
  }

  _populateHobbies(){
    axios.get(config.getHobbies)
      .then(res => {
        this.setState({hobbies: res.data})
      }).catch(ex => {
        toast.warn('ups, tidak bisa menampilkan tempat lahir')
      })
  }

  componentDidMount(){
    this._populateCities()
    this._populateHobbies()
  }

  _doSubmit(){
    const { 
      data, radio, checkbox
    } = this.state

    const upload = {
      full_name: data.full_name, 
      date_of_birth: data.date_of_birth,
      place_of_birth_id: data.place_of_birth_id,
      phone_number: data.phone_number, 
      address: data.address, 
      last_education: data.last_education, 
      religion: radio.religion,
      hobbies: checkbox.hobbies
    }

    this.setState({
      data: {
        full_name: '', date_of_birth: '',
        place_of_birth_id: '', phone_number: '', 
        address: '', last_education: ''
      }, 
      radio: { religion: ''},
      checkbox: { hobbies: []}
    })

    axios.post(config.postData, upload)
      .then(res => {
        toast.success('data berhasil di tambahkan')
      }).catch(ex => {
        toast.error('ups gagal, isilah data dengan benar')
      })
  }

  render() { 
    const {
      data,
      cities, education, religion,
      hobbies
    } = this.state
    
    return (  
      <div className="row justify-content-center">
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-8 m-0 pt-4 pb-4 text-monospace">
        
        <InputText 
          name='full_name'
          label='nama lengkap'
          value={data.full_name}
          onChange={this.handleChangeText}
          placeholder='full name'
        />
        
        <Select 
          name='place_of_birth_id'
          label='Tempat lahir'
          data={cities}
          value={data.place_of_birth_id}
          onChange={this.handleChangeText}
        />        
        
        <InputText 
          name='date_of_birth'
          label='Tanggal lahir'
          type='date'
          value={data.date_of_birth}
          onChange={this.handleChangeText}
          placeholder='yyyy-mm-dd'
        />

        <InputText 
          name='phone_number'
          label='nomer hp'
          value={data.phone_number}
          onChange={this.handleChangeText}
          placeholder='0858xxxx'
        />

        <TextArea 
          name='address'
          label='alamat'
          value={data.address}
          onChange={this.handleChangeText}
          placeholder='alamat'
        />
        
        <Select 
          name='last_education'
          label='Pendidikan terakhir'
          data={education}
          value={data.last_education}
          onChange={this.handleChangeText}
        />  

        <Radio 
          title='agama'
          name='religion'
          data={religion}
          onChange={this.handleChangeRadio}
        />

        <Radio 
          title='hobbies'
          name='hobbies'
          data={hobbies}
          type='checkbox'
          onChange={this.handleChangeCheckbox}
        />

        <button className='btn btn-primary w-100 mt-3'
          onClick={this._doSubmit}
        >
          kirim
        </button>

        </div>
      </div>
    )
  }
}
 
export default CreateData;