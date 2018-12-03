import React from 'react';
import { Table } from 'semantic-ui-react';

export const ProductTableBody = (props) => (
    <Table.Body>
        { typeof(props.products)!=="undefined" && !isEmpty(props.products) ? props.products.map(p=>(
                <Table.Row key={p.id}>
                    <Table.Cell>{p.name}</Table.Cell>
                    <Table.Cell>{p.kcal}</Table.Cell>
                    <Table.Cell>{p.carbohydrates}</Table.Cell>
                    <Table.Cell>{p.proteins}</Table.Cell>
                    <Table.Cell>{p.fats}</Table.Cell>
                    <Table.Cell>{p.serveSize}</Table.Cell>
                </Table.Row>                
        )) : null  }
    </Table.Body>
);

const isEmpty = (obj) => { // eslint-disable-next-line
    for(const key in obj) { 
        if(obj.hasOwnProperty(key)) // eslint-disable-line
            return false;
    }
    return true;
}