import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { query, Query } from 'react-apollo';
import gql from 'graphql-tag';
import 'react-tabs/style/react-tabs.css';
import Pagination from "react-js-pagination";
// require("bootstrap/less/bootstrap.less");


export default class Cards extends Component {
    constructor(props) {
        super(props)

        this.state = {
            "type": this.props.type,
            "status": this.props.status,
            activePage: 1
        }
           console.log(this.state)
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
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
            <>
            <div className="bottom-tabs1">
              <Query query={gql`
         {
             schedule(type: ${JSON.stringify(this.state.type)},status:${JSON.stringify(this.state.status)},page:${JSON.stringify(this.state.activePage)}){
                 matchID
                 seriesName
                 venue
                 startDate
                 homeTeamName
                 awayTeamName
                 toss
                 seriesID
                 matchNumber
             }
         }
 
   `}>
                            {({ loading, error, data }) => {
                                if (loading) return <p>Loading.....</p>
                                if (error) return <p>error.....</p>

                                return data.schedule.map(({ matchID, seriesName, venue, awayTeamName, matchNumber, toss, seriesID, startDate, homeTeamName }) => (
                                    <div className="fl w-100 w-50-ns" key={matchID}>
                                        <div className="height20"></div>
                                        <div className="bg-main">
                                            <div className="card-wrapper">
                                                <div className="title">
                                                    <div className="flex justify-between items-center pa3">
                                                        <span className="f7 fw5">{seriesName}</span>
                                                        <span className="f7 gray mr2"> ❯ </span>
                                                    </div>
                                                    <div className="divider"></div>
                                                </div>
                                                <div className="card-body">
                                                    <p className="ma0 mv3 f7 fw5">
                                                        {matchNumber}, {venue}
                                                    </p>
                                                    <ul className="card-list">
                                                        <li>
                                                            <img className="h1 w15 shadow-4" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTFweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNTEgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5mbGFnX2VtcHR5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImhvbWUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJmbGFnX2VtcHR5IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRTFFMUUxIiB4PSIwIiB5PSIyMSIgd2lkdGg9IjUxIiBoZWlnaHQ9IjExIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjExIiB3aWR0aD0iNTEiIGhlaWdodD0iMTAiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0UxRTFFMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjUxIiBoZWlnaHQ9IjExIj48L3JlY3Q+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTdGFyIiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI1IDE4IDIyLjY0ODg1OSAxOS4yMzYwNjggMjMuMDk3ODg3IDE2LjYxODAzNCAyMS4xOTU3NzM5IDE0Ljc2MzkzMiAyMy44MjQ0Mjk1IDE0LjM4MTk2NiAyNSAxMiAyNi4xNzU1NzA1IDE0LjM4MTk2NiAyOC44MDQyMjYxIDE0Ljc2MzkzMiAyNi45MDIxMTMgMTYuNjE4MDM0IDI3LjM1MTE0MSAxOS4yMzYwNjgiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXIiIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMTQgMTcuNSAxMi4yMzY2NDQyIDE4LjQyNzA1MSAxMi41NzM0MTUyIDE2LjQ2MzUyNTUgMTEuMTQ2ODMwNSAxNS4wNzI5NDkgMTMuMTE4MzIyMSAxNC43ODY0NzQ1IDE0IDEzIDE0Ljg4MTY3NzkgMTQuNzg2NDc0NSAxNi44NTMxNjk1IDE1LjA3Mjk0OSAxNS40MjY1ODQ4IDE2LjQ2MzUyNTUgMTUuNzYzMzU1OCAxOC40MjcwNTEiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXIiIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMzYgMTcuNSAzNC4yMzY2NDQyIDE4LjQyNzA1MSAzNC41NzM0MTUyIDE2LjQ2MzUyNTUgMzMuMTQ2ODMwNSAxNS4wNzI5NDkgMzUuMTE4MzIyMSAxNC43ODY0NzQ1IDM2IDEzIDM2Ljg4MTY3NzkgMTQuNzg2NDc0NSAzOC44NTMxNjk1IDE1LjA3Mjk0OSAzNy40MjY1ODQ4IDE2LjQ2MzUyNTUgMzcuNzYzMzU1OCAxOC40MjcwNTEiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="" />

                                                        </li>
                                                        <li className="name">
                                                            {homeTeamName}
                                                        </li>
                                                        <li className="datetime">
                                                            {`${this.getDate(startDate)[0]}`}
                                                        </li>
                                                    </ul>
                                                    <ul className="card-list">
                                                        <li>
                                                            <img className="h1 w15 shadow-4" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNTFweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSIwIDAgNTEgMzIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5mbGFnX2VtcHR5PC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGcgaWQ9ImhvbWUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJmbGFnX2VtcHR5IiBmaWxsLXJ1bGU9Im5vbnplcm8iPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlIiBmaWxsPSIjRTFFMUUxIiB4PSIwIiB5PSIyMSIgd2lkdGg9IjUxIiBoZWlnaHQ9IjExIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUiIGZpbGw9IiNGRkZGRkYiIHg9IjAiIHk9IjExIiB3aWR0aD0iNTEiIGhlaWdodD0iMTAiPjwvcmVjdD4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0iI0UxRTFFMSIgeD0iMCIgeT0iMCIgd2lkdGg9IjUxIiBoZWlnaHQ9IjExIj48L3JlY3Q+CiAgICAgICAgICAgIDxwb2x5Z29uIGlkPSJTdGFyIiBmaWxsPSIjRDhEOEQ4IiBwb2ludHM9IjI1IDE4IDIyLjY0ODg1OSAxOS4yMzYwNjggMjMuMDk3ODg3IDE2LjYxODAzNCAyMS4xOTU3NzM5IDE0Ljc2MzkzMiAyMy44MjQ0Mjk1IDE0LjM4MTk2NiAyNSAxMiAyNi4xNzU1NzA1IDE0LjM4MTk2NiAyOC44MDQyMjYxIDE0Ljc2MzkzMiAyNi45MDIxMTMgMTYuNjE4MDM0IDI3LjM1MTE0MSAxOS4yMzYwNjgiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXIiIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMTQgMTcuNSAxMi4yMzY2NDQyIDE4LjQyNzA1MSAxMi41NzM0MTUyIDE2LjQ2MzUyNTUgMTEuMTQ2ODMwNSAxNS4wNzI5NDkgMTMuMTE4MzIyMSAxNC43ODY0NzQ1IDE0IDEzIDE0Ljg4MTY3NzkgMTQuNzg2NDc0NSAxNi44NTMxNjk1IDE1LjA3Mjk0OSAxNS40MjY1ODQ4IDE2LjQ2MzUyNTUgMTUuNzYzMzU1OCAxOC40MjcwNTEiPjwvcG9seWdvbj4KICAgICAgICAgICAgPHBvbHlnb24gaWQ9IlN0YXIiIGZpbGw9IiNEOEQ4RDgiIHBvaW50cz0iMzYgMTcuNSAzNC4yMzY2NDQyIDE4LjQyNzA1MSAzNC41NzM0MTUyIDE2LjQ2MzUyNTUgMzMuMTQ2ODMwNSAxNS4wNzI5NDkgMzUuMTE4MzIyMSAxNC43ODY0NzQ1IDM2IDEzIDM2Ljg4MTY3NzkgMTQuNzg2NDc0NSAzOC44NTMxNjk1IDE1LjA3Mjk0OSAzNy40MjY1ODQ4IDE2LjQ2MzUyNTUgMzcuNzYzMzU1OCAxOC40MjcwNTEiPjwvcG9seWdvbj4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="" />

                                                        </li>
                                                        <li className="name">
                                                            {awayTeamName}
                                                        </li>
                                                        <li className="datetime">
                                                            {`${this.getDate(startDate)[1]}`}
                                                        </li>
                                                    </ul>
                                                    <div className="flex  justify-center"><span className="bottom-time">   {`${this.getDate(startDate)[0]}  ${this.getDate(startDate)[1]}`} </span></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }}
                        </Query>
            </div>
            <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={3}
          onChange={this.handlePageChange.bind(this)}
        />
        </>
        )
    }
}
