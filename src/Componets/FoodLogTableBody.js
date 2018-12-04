import React from 'react';
import { Table } from 'semantic-ui-react';

export const FoodLogTableBody = (props) => (
    <Table.Body>
        { typeof(props.foodlog)!=="undefined" && !isEmpty(props.foodlog) ? props.foodlog.sort((a, b)=>{
            a=new Date(`${a.date.substr(0, 10)} ${a.date.substr(11, 8)}`);
            b=new Date(`${b.date.substr(0, 10)} ${b.date.substr(11, 8)}`);
            return a>b ? -1 : a<b ? 1 : 0;
        }).map(p=>(
                <Table.Row key={p.date}>
                    <Table.Cell>{p.date.substr(0, 10)}</Table.Cell>
                    <Table.Cell>{p.date.substr(11, 8)}</Table.Cell>
                    <Table.Cell>{p.product.name}</Table.Cell>
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