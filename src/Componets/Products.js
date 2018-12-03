import React from "react";
import { Header, Divider, Segment, Table, Menu, Loader, Modal, Button, Icon, Form, Message } from "semantic-ui-react";
import authApi from "../authApi";
import { ProductTableBody } from "./ProductTableBody";
import { PaginationPartial } from "./Pagination"
import  Validator from "validator"
import { Redirect } from "react-router";

export default class Root extends React.Component  {
    
    state = {
        loading: false,
        products: [],
        pagination: {},
        pageSize: 10,
        errors: {
            name: '',
            kcal:'',
            carbohydrates:'',
            protiens:'',
            fats:'',
            serveSize:''
        },
        data: {
            name: '',
            kcal:-1,
            carbohydrates:-1,
            protiens:-1,
            fats:-1,
            serveSize:-1
        },
        added:false
        }

    componentDidMount()
    {   
        this.fetchProducts(1);
    }

    onChange = e => 
    this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
});

    fetchProducts = (page) =>
    {
        this.setState({loading: true});
        authApi.getProducts(page, this.state.pageSize).then(res=>{
            this.setState({products:res.data.results, pagination:res.data.pagination, loading:false});

        });
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


    validate = data =>
    {
        var errors = {};
        if(!Validator.isNumeric(data.kcal) && data.kcal < 0)
        {
            errors.kcal = "Wrong kcal";
        }
        else  errors.kcal="";
        
        if(!Validator.isNumeric(data.carbohydrates) && data.carbohydrates < 0)
        {
            errors.carbohydrates = "Wrong carbohydrates";
        }
        else  errors.carbohydrates="";

        if(!Validator.isNumeric(data.protiens) && data.protiens < 0)
        {
            errors.kcal = "Wrong protiens";
        }
        else  errors.protiens="";
        
        if(!Validator.isNumeric(data.fats) && data.fats < 0)
        {
            errors.fats = "Wrong fats";
        }
        else  errors.fats="";

        if(!Validator.isNumeric(data.serveSize) && data.serveSize < 0)
        {
            errors.serveSize = "Wrong serveSize";
        }
        else  errors.serveSize="";

        if(data.name === "")
            errors.name = "Empty name";
        else
            errors.name = "";

        this.setState({errors: errors});

        if(errors.name==="" &&  errors.name===""  &&  errors.kcal===""&&  errors.protiens==="" &&  errors.carbohydrates===""&&  errors.fats==="" &&  errors.serveSize==="") return 0;
        return 1;
    }

    onSubmit = () =>
    {
        
        if(!this.validate(this.state.data))
        {

           let product = {
               "name": this.state.data.name,
               "kcal": parseInt(this.state.data.kcal),
               "carbohydrates": parseFloat(this.state.data.carbohydrates),
               "proteins": parseFloat(this.state.data.protiens),
               "fats": parseFloat(this.state.data.fats),
               "serveSize": parseInt(this.state.data.serveSize)
           }
           authApi.postProduct(product).then(res=>{
            this.setState({added:true});
        });
        }
    }

    onClose = () =>
    {
        this.fetchProducts(1);
        this.setState({added:false});
    }
    
    render = () => 
    (  
        <div className="products-table">
            <Segment>
             <Header>Produkty</Header>
             <Divider />
            <Table celled>
                {this.state.loading && <Loader />}
                <Table.Header>
                    <Table.HeaderCell>Nazwa</Table.HeaderCell>
                    <Table.HeaderCell>Kalorie</Table.HeaderCell>
                    <Table.HeaderCell>Węglowadany</Table.HeaderCell>
                    <Table.HeaderCell>Białka</Table.HeaderCell>
                    <Table.HeaderCell>Tłuszcz</Table.HeaderCell>
                    <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                </Table.Header>
                <ProductTableBody products={this.state.products}/>
                <Table.Footer>
                <Table.HeaderCell colSpan='6'>
                <Menu compact>
                    <Menu.Item active={this.state.queryPageSize===1} onClick={this.setPageSize}>1</Menu.Item>
                    <Menu.Item active={this.state.queryPageSize===10} onClick={this.setPageSize}>10</Menu.Item>
                    <Menu.Item active={this.state.queryPageSize===50} onClick={this.setPageSize}>50</Menu.Item>
                </Menu>

                    <PaginationPartial pagination={this.state.pagination} onPageChange={this.onPageChange} />
                </Table.HeaderCell>
                </Table.Footer>
            </Table>            

        <Modal onClose={this.onClose} trigger={<Button icon color="green"><Icon name="add"/>Dodaj</Button>}>
        <Modal.Header>Dodaj produkt</Modal.Header>
        <Modal.Content>
            {this.state.added && <Message success>Dodano</Message>}
        <Form onSubmit={this.onSubmit}>
            <Form.Input fluid onChange={this.onChange} name="name" placeholder='Nazwa'></Form.Input>
            <Form.Input fluid  onChange={this.onChange} name="kcal" placeholder='Ilość kilokalorii'></Form.Input>
            <Form.Input fluid   onChange={this.onChange}name="carbohydrates" placeholder='Węglowodany'></Form.Input>
            <Form.Input fluid   onChange={this.onChange}name="protiens" placeholder='Białka'></Form.Input>
            <Form.Input fluid   onChange={this.onChange}name="fats" placeholder='Tłuszcze'></Form.Input>
            <Form.Input fluid   onChange={this.onChange} name="serveSize" placeholder='Wielkość porcji'></Form.Input>

            <Button color="green" icon="add"><Icon name="add"/>Dodaj produkt</Button>
        </Form>
        </Modal.Content>
    </Modal>

             </Segment>
        </div>
    );
}