import React from "react"
import { Alert, Form, Button, Card, } from 'react-bootstrap'
import axios from 'axios'
import {Redirect } from 'react-router-dom'
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
            name: "",
            email: "",
            password: "",
            registered: false,
            redirect: false
        };
    }
    submitData = async (event) => {
        event.preventDefault()
        try {

            const res = await axios.post(process.env.REACT_APP_REGISTER_URL, { name: this.state.name, email: this.state.email, password: this.state.password });
            const token = res.data.token
            const user = res.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            this.setState({ registered: true })

        } catch (error) {

            if (error.response != null && error.response.status !== 200)
                this.setState({ errors: error.response.data.errors })
            else this.setState({ errors: ['Unknown error occured'] })
        }

    }
    render() {
        var success = null;
        if (this.state.registered){
            success = (<Alert variant='success'> Sucessfully Registered, Logging in...  </Alert>)
            setTimeout(()=> this.setState({redirect: true}) , 1000)
        }
        if( this.state.redirect)
            return (<Redirect to='/' />)
        return (

            <Card>
                <Card.Header variant='primary' className="text-center bg-primary text-white"  >
                    Register Account

        </Card.Header>
                <Card.Body>
                    {
                        this.state.errors.map((error, idx) => (
                            <Alert key={idx} variant='danger'  >
                                {error}
                            </Alert>
                        )
                        )
                    }
                    {success}
                    <Form onSubmit={this.submitData}>
                        <Form.Group controlId="formBasicName"  >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" onChange={e => this.setState({ name: e.target.value })} />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail"  >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={e => this.setState({ email: e.target.value })} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
                        </Form.Group>
                        <Button className='w-100' variant="primary" type="submit">
                            Submit
            </Button>
                    </Form>
                </Card.Body>
            </Card>

        )
    }
}