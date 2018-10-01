import React, { Component } from 'react';
import "./LayoutPane.css";
import $ from "../node_modules/jquery/dist/jquery";
export default class LayoutPane extends Component {
    static count = 0;
    state = {data:{}};
    constructor(props) {
        super(props);
        this.cid = ++LayoutPane.count;
        this.state.data = props.data;
        this.type = props.type;
    };
    pushEmptyData = (data, dcount) => {
        var i;
        dcount = dcount? dcount: 1;
        for (i = 0; i < dcount; i++) {
            data.push({
                cols: [],
                components: [],
                rows: [],
                css: '',
                js: '',
                html: '',
                conf: '',
                libs: [],
                imports: []
            });
        }
    };
    drop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        var addData = e.dataTransfer.getData("id"),
            pushDataObj,
            count,
            data = this.state.data;
        if (addData === 'row') {
            if (this.type === 'col' && data.rows.length) {
                this.pushEmptyData(data.rows[0].rows, 2)
            } else {
                this.pushEmptyData(data.rows)
            }
        } else if (addData === 'col') {
            if (!data.rows.length) {
                count = 2;
                if (this.type === 'col') {
                    this.pushEmptyData(data.rows);
                    pushDataObj = data.rows[0].cols;
                } else {
                    pushDataObj = data.cols;
                }
                if (pushDataObj.length) {
                    count = 1;
                }
                this.pushEmptyData(pushDataObj, count);
            } else {
                if (data.rows.length === 1) {
                    count = 2;
                    pushDataObj = data.rows[0].cols;
                    if (pushDataObj.length) {
                        count = 1;
                    }
                    this.pushEmptyData(data.rows[0].cols, count);
                } else {
                    console.log("Wrong drop location for column.")
                }
            }
        }
        data = JSON.parse(JSON.stringify(data));
        this.setState({data: data});
        $(".content-pane").append(addData);
    };
    allowDrop = (e) => {
        e.preventDefault();
    };
    getRows = () => {
        var out = this.state.data.rows.map(function (row, index) {
            return (
                <LayoutPane data={row} key={index}></LayoutPane>
            );
        })
        return out;
    };
    getCols = () => {
        var out = this.state.data.cols.map(function (col, index) {
            return (
                <LayoutPane data={col} type="col" key={index}></LayoutPane>
            )
        })
        return out;
    };
    getComponents = () => {
        return '';
    };
    moreLayouts = () => {
        var out = '',
            data = this.state.data,
            rows = data.rows,
            cols = data.cols,
            components = data.components;
        if (rows.length) {
            out = this.getRows();
        } else if (cols.length) {
            out = this.getCols();
        } else if (components.length) {
            out = this.getComponents();
        }
        return out;
    };
    render() {
        var typeClass = 'row no-gutters';
        if (this.cid === 1) {
            typeClass = 'layout-pane ' + typeClass;
        }
        if (this.type) {
            typeClass = this.type;
        }
        return (
            <div className={`${typeClass}`} onDrop={this.drop} onDragOver={this.allowDrop} id={`layoutPane${this.cid}`}>
                <a href="#lay-settings" className="settings material-icons">settings_application</a>
                {this.moreLayouts()}
            </div>
        );
    }
}