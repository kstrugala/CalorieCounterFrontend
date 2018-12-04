import React from "react";
import { Header, Divider, Segment, Table, Menu, Loader, Grid, Button, Icon, Form, Message } from "semantic-ui-react";
import authApi from "../authApi";
import { PaginationPartial } from "./Pagination"
import  Validator from "validator"
import { Redirect } from "react-router";
import {FoodLogTableBody} from "./FoodLogTableBody"

import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from "recharts";

export default class foodlog extends React.Component  {
    
    state = {
        loading: false,
        type: "w",
        foodlog: [],
        chartData: []
    }

    componentDidMount() {
        this.fetchFoodLog();
    }
    
    fetchFoodLog = () =>
    {
        this.setState({loading:true});
        if(this.state.type === "w")
        {
            authApi.getLastWeekFoodlog().then(res=>this.setState({foodlog:res.data.foodEntries}, ()=>{
                this.processFoodLog(this.state.foodlog);
            }));
        } 
        else{
            authApi.getLastMonthFoodlog().then(res=>this.setState({foodlog:res.data.foodEntries}, ()=>{
                this.processFoodLog(this.state.foodlog);
            }));
        }
    }

    processFoodLog = (foodlog) => {
        var stats = {};
        
        foodlog.forEach(p => {
            !(p.date.substr(0, 10) in stats) ? stats[p.date.substr(0, 10)] = p.product.kcal : stats[p.date.substr(0, 10)] += p.product.kcal;
        });

        var chartData = [];
        
        Object.keys(stats).forEach((key)=>{
            chartData.push({date: key, kcal: stats[key]});
        })

        chartData.sort((a, b)=>{
            a = new Date(a["date"]);
            b = new Date(b["date"]);
            return a<b ? -1 : a>b ? 1 : 0;
        });
        
        this.setState({loading:false, chartData:chartData}); 
    }

    setWeek = () =>{
        this.setState({type:"w"},()=>{
            this.fetchFoodLog()
        })
    }

    
    setMonth = () =>{
        this.setState({type:"m"},()=>{
            this.fetchFoodLog()
        })
    }

    render = () => 
    (  
        <div className="stats">
            <style>
                {`
                    .centered {
                        margin: 0 42.5%;
                    }
                `}
            </style>
            <Segment loading={this.state.loading}>
             <Header>Statystyki</Header>
             <Divider />
             <LineChart width={1100} height={600} data={this.state.chartData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="date"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <Line type="monotone" dataKey="kcal" stroke="#8884d8" activeDot={{r: 8}}/>
                </LineChart>

                <div className="centered">
                <Menu compact>
                            <Menu.Item active={this.state.type==="w"} onClick={this.setWeek}>Tydzień</Menu.Item>
                            <Menu.Item active={this.state.type==="m"} onClick={this.setMonth}>Miesiąc</Menu.Item>
                </Menu>
                </div>
             </Segment>
        </div>
    );
}
