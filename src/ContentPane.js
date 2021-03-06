import React, { Component } from 'react';
import "./ContentPane.css";
import LayoutPane from "./LayoutPane";
import $ from "../node_modules/jquery/dist/jquery";
import rowData from './res/components/row/conf.json';
export default class ContentPane extends Component {
    state = {data:{}};
    constructor(props) {
        super(props);
        this.state.data = props.data;
        if (!props.data.rows) {
            props.data.rows = [];
        }
        if (!props.data.rows.length) {
            props.data.rows.push(JSON.parse(JSON.stringify(rowData)));
        }
        // props.handleComponentChange(props.data.rows[0]);
    };
    
    drop = (e) => {
        e.preventDefault();
        var data = e.dataTransfer.getData("id");
        $(".content-pane").append(data);
    };
    allowDrop = (e) => {
        e.preventDefault();
    };
    getLayout = () => {
        var handleComponentChange = this.props.handleComponentChange;
        var out = this.state.data.rows.map(function (row, index) {
            return (
                <LayoutPane handleComponentChange={handleComponentChange} data={row} key={index}></LayoutPane>
            );
        });
        return out;
    }
    render() {
      return (
        <div className="content-pane" onDrop={this.drop} onDragOver={this.allowDrop}>
            {this.getLayout()}
        </div>
      );
    }
}