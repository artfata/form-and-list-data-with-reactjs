import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import config from '../config'

class GetData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  
      data: []
    }

    this._populateData = this._populateData.bind(this)
    this._deleteData = this._deleteData.bind(this)
    this._updateData = this._updateData.bind(this)
  }

  _populateData(){
    axios.get(config.getData)
      .then(res => {
        this.setState({ data: res.data})
      }).catch(ex => {
        toast.error('ups, coba beberapa saat lagi')
      })
  }

  _deleteData(id){
    const { data } = this.state;
    const newData = data.filter(d => d.id !== id)
    this.setState({data: newData})

    axios.delete(`${config.deleteData}/${id}`)
      .then(res => {
        toast.success('data berhasil di hapus')
      }).catch(ex => {
        toast.error('ups, gagal menghapus data')
      })
  }

  _updateData(){
    toast.info('ups maaf, fitur update data belum di dukung')
  }

  componentDidMount() {
    this._populateData()
  }

  render() { 
    const {
      data
    } = this.state

    return (  
      <div className='row justify-content-center'>
        <div className="col-xl-10 col-lg-10 col-md-10 col-sm-12 m-0 pt-4 pb-4 overflow-auto">

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nama lengkap</th>
              <th scope="col">Tempat lahir</th>
              <th scope="col">Tanggal lahir</th>
              <th scope="col">Nomer telepon</th>
              <th scope="col">Alamat</th>
              <th scope="col">Pendidikan terakhir</th>
              <th scope="col">Agama</th>
              <th scope="col">Hobi</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(d => (
              <tr key={d.id}>
                <th scope="row">{d.id}</th>
                <td>{d.full_name}</td>
                <td>{d.place_of_birth}</td>
                <td>{d.data_of_birth}</td>
                <td>{d.phone_number}</td>
                <td>{d.address}</td>
                <td>{d.last_education}</td>
                <td>{d.religion}</td>
                <td>{d.hobbies.map(h => (
                  <span key={h.name}>{h.name},</span>
                ))}</td>
                <td>
                  <button className="btn btn-sm btn-info"
                    onClick={this._updateData}>
                    edit
                  </button>
                  <button className="btn btn-sm btn-danger"
                    onClick={() => this._deleteData(d.id)}>
                    hapus
                  </button>
                </td>
              </tr>  
            ))}
          </tbody>
        </table>


        </div>
      </div>
    )
  }
}
 
export default GetData;