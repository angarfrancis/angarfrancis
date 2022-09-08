import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Form,
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  FormGroup,
  Input,
  Col,
  CardFooter,
  Spinner,
} from "reactstrap";
import { post } from "services/api";
const Login = (props) => {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const useLoc = useHistory();
  const signin = async () => {
    setLoading(true);
    const resp = await post("/auth", { email, password});
    if (resp.success) {
      localStorage.setItem('token',resp.token);
      navigate()
    } else {
      setMsg(resp.message);
    }
    setTimeout(() => {
      setLoading(false);
    }, 500)
  }
  const navigate = ()=>{
    if(localStorage['token'] !== undefined){
      useLoc.push("/")
    }else{
      navigate()
    }
  }
  useEffect(() => {
    if (localStorage['token']) {
      useLoc.push("/")
    }
  }, [useLoc])

  return (
    <Container className="content d-flex flex-row justify-content-between">
      <Form className="w-100 d-flex flex-row justify-content-center py-4" onSubmit={(e) => { e.preventDefault(); signin() }}>
        <Col lg="7" md="12">
          <Card className="card-tasks h-auto mt-5">
            <CardHeader className="text-center">
              <img src={require('../assets/logo.jpeg')} style={{ width: '3rem' }} alt="logo" />
              <br />
              <CardTitle className="d-inline" style={{ fontSize: 'large' }}>Timetable Management System</CardTitle>
            </CardHeader>
            <CardBody className="px-5">
              <FormGroup >
                <Label>
                  Email
                </Label>
                <Input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="example@example.com" required />
              </FormGroup>
              <FormGroup >
                <Label>
                  Password
                </Label>
                <Input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="password" required />
              </FormGroup>
              {msg !== null? <span className="text-danger">{msg}</span>:''}
            </CardBody>
            <CardFooter>
              <ButtonGroup className="d-flex flex-row justify-content-end">
                {!loading ? <Button type="submit" className="btn-success">Login</Button> : <Button>
                  <Spinner
                    color="primary"
                    style={{
                      height: '3rem',
                      width: '3rem'
                    }}
                    type="grow"
                  >
                    Signing in...
                  </Spinner>
                </Button>}
              </ButtonGroup>
            </CardFooter>
          </Card>
        </Col>
      </Form>
    </Container>
  );
}

export default Login;
