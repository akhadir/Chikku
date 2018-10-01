import React, { Component } from 'react';
import "./ContentPane.css";
import LayoutPane from "./LayoutPane";
import $ from "../node_modules/jquery/dist/jquery";
export default class ContentPane extends Component {
    state = {data:{}};
    constructor(props) {
        super(props);
        this.state.data = props.data;
        if (!props.data.rows) {
            props.data.rows = [];
        }
        if (!props.data.rows.length) {
            props.data.rows.push({
                cols: [],
                components: [],
                rows: [],
                css: '',
                js: '',
                html: '',
                conf: '',
                libs: [],
                imports: []
            })
        }
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
        var out = this.state.data.rows.map(function (row, index) {
            return (
                <LayoutPane data={row} key={index}></LayoutPane>
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