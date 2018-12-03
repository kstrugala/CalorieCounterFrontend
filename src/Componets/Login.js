import React from "react";
import { Button, Form, Grid, Header, Message, Segment } from "semantic-ui-react";
import Validator from "validator";
import api from "../api";
import { Redirect } from "react-router";


export default class Login extends React.Component {

    state = {
        data: {
            email:'',
            password:'',
        },
        loading: false,
        errors: {
            email:'',
            password:''
        }
    }

    onChange = e => 
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    validate = data =>
    {
        var errors = {};
        if(!Validator.isEmail(data.email))
        {
            errors.email = "Wrong email";
        }
        else  errors.email="";
        if(!data.password) errors.password = "Password can't be blank.";
        else  errors.password="";

        this.setState({errors: errors});

        if(errors.email==="" && errors.password==="") return 0;
        return 1;
    }

    onSubmit = () =>
    {
        
        if(!this.validate(this.state.data))
        {
           api.signin(this.state.data.email, this.state.data.password).then(res=> {
                
                if(res.status==200)
                {
                    this.setState({loading:true});
                    
                    sessionStorage.setItem("isAuthenticated", "true");
                    sessionStorage.setItem("accessToken", res.data.accessToken);
                    sessionStorage.setItem("refreshToken", res.data.refreshToken);
                    sessionStorage.setItem("expires", res.data.expires);

                    this.props.history.push('/dashboard');
 
                }
                else
                {
                    this.setState({loading:false});

                }
           });
        }
    }

    
    render() {
        return (
            <div className='login-form'>

            {sessionStorage.getItem("isAuthenticated") === "true" && 
                <Redirect to="/dashboard" />
            }

            <style>{`
                body > div,
                body > div > div,
                body > div > div > div.login-form {
                    height: 100%;
                }
                `}</style>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Zaloguj się
                            </Header>
                        <Form size='large' onSubmit={this.onSubmit} loading={this.state.loading}> 
                            <Segment stacked>
                                <Form.Input fluid icon='envelope' iconPosition='left' placeholder='Adres e-mail' name="email" onChange={this.onChange} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Hasło'
                                    type='password'
                                    name="password" 
                                    onChange={this.onChange} 
                                />

                                <Button color='teal' fluid size='large'>
                                    Zaloguj
                                </Button>
                            </Segment>
                        </Form>

                         {this.state.errors.email != "" &&
                            <Message error>
                                Nieprawidłowy adres e-mail.
                            </Message>
                            }
                             {this.state.errors.password !=""  &&
                                <Message error>
                                   Hasło nie może być puste.
                                </Message>
                            }

                        <Message>
                            Nie masz konta? <a href='/signup'>Zarejstruj się</a>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
} 