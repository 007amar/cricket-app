import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { query, Query } from 'react-apollo';
import gql from 'graphql-tag';
import 'react-tabs/style/react-tabs.css';
import Cards from './Cards';


export default class BottomTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "type": "all",
            "status": this.props.toptabindex
        }
        //    console.log(this.state)
    }
    async selectedBottomTabs(index) {
        let value;
        if (index === 0) {
            value = "all";
            await this.setState({
                type: value
            })
        } if (index === 1) {
            value = "international"
            await this.setState({
                type: value
            })
        } if (index === 2) {
            value = "domestic"
            await  this.setState({
                type: value
            })
        }
        console.log(this.state)
      

    }
    getDate(UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var time = [date + ' ' + month, hour + ':' + min];
        return time;
    }
    render() {
        return (
            <div className="bottom-tabs">
                <Tabs onSelect={tabIndex => this.selectedBottomTabs(tabIndex)}>
                    <TabList>
                        <Tab>All</Tab>
                        <Tab>International</Tab>
                        <Tab>Domestic</Tab>
                    </TabList>

                    <TabPanel>
                     <Cards type={this.state.type} status={this.state.status}/>
                    </TabPanel>


                    <TabPanel>
                    <Cards type={this.state.type} status={this.state.status}/>
                    </TabPanel>


                    <TabPanel>
                    <Cards type={this.state.type} status={this.state.status}/>                    </TabPanel>
                   
                </Tabs>
            </div>
        )
    }
}
