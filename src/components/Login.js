import React from "react"
import { Alert, Form, Button, Card,  } from 'react-bootstrap'
import axios from 'axios'
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      email: "",
      password: "",
      loggedIn: false,
    };
  }
  submitData =  async (event) => {
    event.preventDefault()
    try{

      const res = await axios.post(process.env.REACT_APP_LOGIN_URL  , {email: this.state.email , password: this.state.password});
      const token = res.data.token
      localStorage.setItem('token', token)
      this.setState({loggedIn : true }) 
      
    }catch(error){
      console.log(error)
      if(error.reponse && error.response.status === 401) this.setState({errors:  error.response.data.errors })
      else this.setState({ errors: ['Unknown error occured'] })
    }

  }
  render() {
    var success = null;
      if( this.state.loggedIn)
        success =  (<Alert variant='success'> Sucessfully Logged In </Alert>)
    return (

      <Card>
        <Card.Header variant='primary' className="text-center bg-primary text-white"  >
          Login 

        </Card.Header>
        <Card.Body>
          { this.state.errors.map(( error, idx ) =>(
              <Alert key={idx} variant='danger'  >
                {error}
              </Alert>

              )
            )
          }
          { success }
          <Form onSubmit = {this.submitData}>
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
export default Login;