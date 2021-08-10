import React, {Component} from 'react'
import axios from 'axios';

class postform extends Component{

    constructor(props){
        super(props)

        this.state = {
            plate: ''
        }
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:3000/api/reservations', this.state)
        .then(response =>{
            console.log(response.data)
        })
    }

    render(){
        const {plate} = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Reservar espacio</h2>
                    <label>Número de Placa:</label>
                    <div>
                        <input type="text" name="plate" value={plate}
                        onChange={this.handleChange}></input>
                    </div>
                    <div>
                        <button type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        )
    }
}
export default postform