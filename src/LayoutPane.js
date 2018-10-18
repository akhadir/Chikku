import React, { Component } from 'react';
import ComponentPane from "./ComponentPane";
import "./LayoutPane.css";
import $ from "../node_modules/jquery/dist/jquery";
import rowData from './res/components/row/conf.json';
import colData from './res/components/col/conf.json';
export default class LayoutPane extends Component {
    static count = 0;
    state = {data:{}};
    constructor(props) {
        super(props);
        this.cid = ++LayoutPane.count;
        this.state.data = props.data;
        this.type = props.type;
        this.props.handleComponentChange(this)
    };
    setCurrentConf(e) {
        e.preventDefault();
        this.props.handleComponentChange(this);
    }
    pushEmptyData = (data, dcount, isCol) => {
        var i,
            newConfig,
            config = rowData;
        dcount = dcount? dcount: 1;
        if (isCol) {
            config = colData;
        }
        for (i = 0; i < dcount; i++) {
            newConfig = JSON.parse(JSON.stringify(config));
            data.push(newConfig);
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
                this.pushEmptyData(data.rows[0].rows, 2);
            } else {
                this.pushEmptyData(data.rows);
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
                this.pushEmptyData(pushDataObj, count, true);
            } else {
                if (data.rows.length === 1) {
                    count = 2;
                    pushDataObj = data.rows[0].cols;
                    if (pushDataObj.length) {
                        count = 1;
                    }
                    this.pushEmptyData(data.rows[0].cols, count, true);
                } else {
                    console.log("Wrong drop location for column.")
                }
            }
        } else {
            data.components.push({type: addData});
        }
        data = JSON.parse(JSON.stringify(data));
        this.setState({data: data});
        $(".content-pane").append(addData);
    };
    allowDrop = (e) => {
        e.preventDefault();
    };
    getRows = () => {
        var that = this,
        out = this.state.data.rows.map(function (row, index) {
            return (
                <LayoutPane data={row} key={index} handleComponentChange={that.props.handleComponentChange}></LayoutPane>
            );
        });
        return out;
    };
    getCols = () => {
        var that = this,
        out = this.state.data.cols.map(function (col, index) {
            return (
                <LayoutPane data={col} type="col" key={index} handleComponentChange={that.props.handleComponentChange}></LayoutPane>
            );
        });
        return out;
    };
    getComponents = (data) => {
        var that = this,
        out = this.state.data.components.map(function (comp, index) {
            return (
                <ComponentPane data={comp} type={comp.type} key={index} handleComponentChange={that.props.handleComponentChange}></ComponentPane>
            );
        });
        return out;
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
        var typeClass = 'row',
            val,
            classKeys,
            conf = this.state.data.conf;
        if (this.cid === 1) {
            typeClass = 'layout-pane ' + typeClass;
        }
        if (this.type) {
            typeClass = this.type;
        }
        classKeys = Object.getOwnPropertyNames(conf);
        classKeys.forEach(function (key, index) {
            val = conf[key];
            if (typeof val === "string" || typeof val === "number") {
                if (val && val != "-1") {
                    typeClass += ' ' + key + '-' + conf[key];
                }
            } else if (typeof val === "boolean") {
                if (val) {
                    typeClass += ' ' + key;
                }
            }
        });
        return (
            <div className={`${typeClass}`} onDrop={this.drop} onDragOver={this.allowDrop} id={`layoutPane${this.cid}`}>
                <a href="#lay-settings" onClick={this.setCurrentConf.bind(this)} className="settings material-icons">settings_application</a>
                {this.moreLayouts()}
            </div>
        );
    }
}