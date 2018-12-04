import React from "react";
import { Header, Divider, Segment, Table, Dropdown, Loader, Modal, Button, Icon, Form, Message } from "semantic-ui-react";
import authApi from "../authApi";
import { PaginationPartial } from "./Pagination"
import  Validator from "validator"
import { Redirect } from "react-router";
import {FoodLogTableBody} from "./FoodLogTableBody"
export default class foodlog extends React.Component  {
    
    state = {
        loading: false,
        added: false,
        foodEntries:[],
        data: {
            quantity: -1
        },
        query: "",
        product: "",
        options: [],
        products: [],
        loadingp: false,
        errorP: false,
        errorQ: false
        }

    componentDidMount()
    {   
        this.fetchFoodlog();
    }


    onClose = () =>
    {
        this.fetchFoodlog();
        this.setState({added:false});
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

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);
    };
 
    onQueryChange = (e, data) => {
        this.setState({ query: data.value, product: data.value });
    };
 
    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState({ loadingp: true });
  
        const products = [];
        const options = [];
  
        authApi.getProductsByName(this.state.query.searchQuery).then(res=>{
            res.data.results.forEach(p => {
                console.log(p);
                products.push(p);
                options.push({
                    key: p.id,
                    value: p.id,
                    text: p.name
                });
            });
            this.setState({ loadingp: false, products, options });
        });
    }

    onSubmit = () =>
    {
        if(this.state.product!=="" && typeof(this.state.product)!=='undefined')
        {
            const product = this.state.products.find(x=>x.id===this.state.product);
            if(Validator.isInt(this.state.data.quantity))
            {
                this.setState({errorP:false, errorQ:false})
                console.log(product);
                console.log(this.state.data.quantity);

                var foodEntry = {
                    "foodEntries": [
                        {
                            "productId": product.id,
                            "quantity": this.state.data.quantity
                        }
                    ]
                }

                authApi.postFoodlog(foodEntry).then(res => {
                    this.setState({added:true});
                })

            }
            else{
                this.setState({errorQ:true})
  
            }
        }
        else
        {
            this.setState({errorP:true})
  
        }
    }
  


    
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

            <Modal onClose={this.onClose}  trigger={<Button icon color="green"><Icon name="add"/>Dodaj</Button>}>
        <Modal.Header>Dodaj produkt</Modal.Header>
        <Modal.Content>
            {this.state.added && <Message success>Dodano</Message>}
            
            {this.state.errorP &&
              <Message info>Proszę wybrać produkt</Message> 
              }
              {this.state.errorQ &&
              <Message info>Proszę wybrać ilość</Message> 
              }
        <Form onSubmit={this.onSubmit}>
            <Form.Field>
            <Dropdown placeholder='Produkt'
                    search
                    selection
                    fluid
                    closeOnChange
                    noResultsMessage="Nie znaleziono produktu."
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                    options={this.state.options}
                    loading={this.state.loadingp}
                    onChange={this.onQueryChange}
                  />
                </Form.Field>
            <Form.Input fluid onChange={this.onChange} name="quantity" placeholder='Ilość'></Form.Input>
            <Button color="green" icon="add"><Icon name="add"/>Dodaj</Button>
        </Form>
        </Modal.Content>
    </Modal>
        
             </Segment>
        </div>
    );
}