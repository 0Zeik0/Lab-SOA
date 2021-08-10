import React, {Component} from 'react';
import axios from 'axios';

class Test extends Component{

    constructor(){
        super()
        this.state = {
            posts: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:3000/api/spaces')
        .then(response =>{
            this.setState({
                posts: response.data
            })
            console.log(response.data);
        })
    }

    render(){
        const {posts} = this.state;
        return (
            <div>
                <h1>Parqueos</h1>
                <h2>Espacios:</h2>
                {
                    posts.map(post => <div key={post.id}>ID: {post.id} Estado: {post.state}</div>)
                }
            </div>
        )
    }
}

export default Test