import React from "react";
import Validator from "validator";
import { Button, Form, Grid, Header, Segment, Message } from "semantic-ui-react";
import api from '../api';


export default class Register extends React.Component {


    state = {
        data: {
            email:'',
            password:'',
            firstName:'',
            lastName:''
        },
        created: false,
        errors: {
            email:'',
            password:'',
            firstName:'',
            lastName:''
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
        if(!data.firstName) errors.firstName = "First name can't be blank.";
        else  errors.firstName="";
        if(!data.lastName) errors.lastName = "Last name can't be blank."; 
        else  errors.lastName="";
        if(!data.password) errors.password = "Password can't be blank.";
        else  errors.password="";
    
        this.setState({errors: errors});

        if(errors.email==="" && errors.firstName==="" && errors.lastName==="" && errors.password==="") return 0;
        return 1;
    }

    onSubmit = () =>
    {
        
        if(!this.validate(this.state.data))
        {
            api.singup(this.state.data.firstName, this.state.data.lastName, this.state.data.email, this.state.data.password).then(res=> {
                if(res.status === 204)
                    this.setState({created:true});
            });
        }
    }

    render = () => 
    (
        <div className="register-from">
             <style>{`
                body > div,
                body > div > div,
                body > div > div > div.register-from {
                    height: 100%;
                }
                `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Rejestracja
                            </Header>
                        <Form size='large' onSubmit={this.onSubmit}>
                            <Segment stacked>
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Imię' name="firstName" onChange={this.onChange} />
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='Nazwisko' name="lastName" onChange={this.onChange}/>

                                <Form.Input fluid icon='envelope' iconPosition='left' placeholder='Adres e-mail' name="email" onChange={this.onChange}/>
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
                                    Zarejestruj
                                </Button>
                            </Segment>
                            
                            

                        </Form>

                        {this.state.errors.email != "" &&
                            <Message error>
                                Nieprawidłowy adres e-mail.
                            </Message>
                            }

                            {this.state.errors.firstName !=""  &&
                                <Message error>
                                    Pole imię nie może być puste.
                                </Message>
                            }
                            
                            {this.state.errors.lastName !=""  &&
                                <Message error>
                                    Pole nazwisko nie może być puste.
                                </Message>
                            }
                             {this.state.errors.password !=""  &&
                                <Message error>
                                   Hasło nie może być puste.
                                </Message>
                            }

                             {this.state.created  &&
                                <Message success>
                                   Konto zostało stworzone
                                </Message>
                            }

                        <Message>
                            Masz już konto? <a href='/'>Zaloguj się</a>
                        </Message>    
                    </Grid.Column>
                </Grid>
        </div>
    );
}