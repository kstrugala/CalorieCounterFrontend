import React from "react";
import { Header, Divider, Segment, Table, Menu, Loader, Modal, Button, Icon, Form, Message } from "semantic-ui-react";
import authApi from "../authApi";
import { PaginationPartial } from "./Pagination"
import  Validator from "validator"
import { Redirect } from "react-router";
import {FoodLogTableBody} from "./FoodLogTableBody"

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export default class foodlog extends React.Component  {
    
    state = {
        loading: false,
    }

    
    render = () => 
    (  

        
        <div className="stats">
            <Segment>
             <Header>Statystyki</Header>
             <Divider />
             <LineChart width={1000} height={600} data={data}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
             </Segment>
        </div>
    );
}
const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];