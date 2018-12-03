import React from "react";
import { Header, Divider, Segment, Table, Menu, Loader, Modal, Button, Icon, Form, Message } from "semantic-ui-react";
import authApi from "../authApi";
import { PaginationPartial } from "./Pagination"
import  Validator from "validator"
import { Redirect } from "react-router";
import {FoodLogTableBody} from "./FoodLogTableBody"
export default class foodlog extends React.Component  {
    
    state = {
        loading: false,
        foodEntries:[]
        }

    componentDidMount()
    {   
        this.fetchFoodlog();
    }

    onChange = e => 
    this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
});

    fetchFoodlog = () =>
    {
        this.setState({loading: true});
        authApi.getFoodlog().then(res=>{
            this.setState({foodEntries: res.data.foodEntries})
        })
        
    }
    isEmpty = (obj) => { // eslint-disable-next-line
        for(const key in obj) { 
            if(obj.hasOwnProperty(key)) // eslint-disable-line
                return false;
        }
        return true;
    }

    setPageSize = (e) => {
        this.setState({pageSize:parseInt(e.target.innerHTML, 10)}, ()=>{this.fetchProducts(1);});
        
    };

    onPageChange = (e, { activePage })=>{
        this.fetchProducts(activePage);
    };



    
    render = () => 
    (  
        <div className="foodlog-table">
            <Segment>
             <Header>Dziennik żywienia</Header>
             <Divider />
            <Table celled>
                {this.state.loading && <Loader />}
                <Table.Header>
                    <Table.HeaderCell>Data</Table.HeaderCell>
                    <Table.HeaderCell>Godzina</Table.HeaderCell>
                    <Table.HeaderCell>Produkt</Table.HeaderCell>
                </Table.Header>
                <FoodLogTableBody foodlog={this.state.foodEntries} />
                <Table.Footer>
                <Table.HeaderCell colSpan='6'>
                </Table.HeaderCell>
                </Table.Footer>
            </Table>            

        
             </Segment>
        </div>
    );
}