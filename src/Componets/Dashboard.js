import React from "react";
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Header,
    Icon,
    Image,
    List,
    Menu,
    Segment,
    Visibility,
  } from 'semantic-ui-react'
import authApi from "../authApi";
import { Redirect } from "react-router";
import Products from "./Products";
import Foodlog from "./Foodlog";
import Stats from "./Stats";


export default class Dashboard extends React.Component {
    componentDidMount(){
    }
    
    state = {
        activePage: "products"
    }

   
    logout = () => {
        authApi.cancelAccessToken().then(res=>{
            sessionStorage.clear();
            this.props.history.push("/");
        })
    }

    showProducts = () => this.setState({activePage: "products"});
    showFoodLog = () => this.setState({activePage: "foodlog"});
    showStats = () => this.setState({activePage: "stats"});


    render = () => 
    (  
        <div className="dashboard">
            {sessionStorage.getItem("isAuthenticated") !== "true" && 
                <Redirect to="/" />
            }
            <Menu fixed="top">
                    <Container>
                        <Menu.Item as="a"  header>
                            CalorieCounter
                        </Menu.Item>

                        <Menu.Item  onClick={this.showProducts} active={this.state.activePage === "products"}>Produkty</Menu.Item>
                        <Menu.Item onClick={this.showFoodLog} active={this.state.activePage === "foodlog"}>Dziennik żywienia</Menu.Item>
                        <Menu.Item onClick={this.showStats} active={this.state.activePage === "stats"}>Statystyki</Menu.Item>

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Konto">
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.logout}>Wyloguj</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container style={{ marginTop: "4em", background: "rgb(255, 255, 255)", boxShadow: "rgb(204, 204, 204) 0px 1px 2px" }}>
                    {this.state.activePage === "products" && <Products/>}
                    {this.state.activePage === "foodlog" && <Foodlog/>}
                    {this.state.activePage === "stats" && <Stats/>}

                </Container>



        </div>
    );
}