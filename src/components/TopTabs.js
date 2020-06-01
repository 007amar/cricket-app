import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import BottomTabs from './BottomTabs'

export default class TopTabs extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "toptabindex": "upcoming"
        }
    }

    selectedTabs(index) {
        let value;
        if (index === 0) {
            value = "upcoming"
        } if (index === 1) {
            value = "running"
        } if (index === 2) {
            value = "completed"
        }
        this.setState({
            toptabindex: value
        })
        // console.log(this.state)
    }
    render() {
        return (
            <div className="top-tabs">
                <Tabs onSelect={(index) => this.selectedTabs(index)}>
                    <TabList>
                        <Tab>UPCOMING</Tab>
                        <Tab>RUNNING</Tab>
                        <Tab>COMPLETED</Tab>
                    </TabList>

                    <TabPanel>
                        <BottomTabs toptabindex= {this.state.toptabindex} />
                    </TabPanel>
                    <TabPanel>
                        <BottomTabs toptabindex= {this.state.toptabindex} />
                    </TabPanel>
                    <TabPanel>
                        <BottomTabs toptabindex= {this.state.toptabindex} />
                    </TabPanel>
                </Tabs>
            </div>
        )
    }
}
