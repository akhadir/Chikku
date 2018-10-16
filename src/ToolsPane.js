import React, { Component } from 'react';
import "./ToolsPane.css";
import $ from "../node_modules/jquery/dist/jquery";
export default class ToolsPane extends Component {
    drag = (e) => {
        var data = $(e.target).data("id");
        e.dataTransfer.setData("id", data);
    }
    render() {
      return (
        <div className="tools-pane">
            <ul className="list-group">
                <li className="list-group-item list-group-item-action active">
                    <label className="lbl" data-toggle="collapse" data-target="#layout-cont" aria-expanded="true" aria-controls="layout-cont">Layouts</label>
                    <div id="layout-cont" className="icon-cont">
                        <div className="icon rounded text-white d-inline-block bg-primary" data-id="row" draggable="true" onDragStart={this.drag}>
                            <i className="material-icons md-24">view_stream</i> <span>Row</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary" data-id="col" draggable="true" onDragStart={this.drag}>
                            <i className="material-icons md-24">view_column</i> <span>Column</span>
                        </div>
                    </div>
                </li>
                <li className="list-group-item list-group-item-action">
                    <label className="lbl" data-toggle="collapse" data-target="#basic-comp-cont" aria-expanded="true" aria-controls="basic-comp-cont">Basic Components</label>
                    <div id="basic-comp-cont" className="icon-cont">
                        <div className="icon rounded bg-primary text-white d-inline-block" data-id="alert" draggable="true" onDragStart={this.drag}>
                            <i className="material-icons md-24">add_alert</i> <span>Alerts</span>
                        </div>
                        <div className="icon rounded bg-primary text-white d-inline-block">
                            <i className="material-icons md-24">crop_7_5</i> <span>Button</span>
                        </div>
                        <div className="icon rounded bg-primary text-white d-inline-block">
                            <i className="material-icons md-24">crop_16_9</i> <span>Text</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary" data-id="checkbox" draggable="true" onDragStart={this.drag}>
                            <i className="material-icons md-24">check_box</i> <span>Check</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">radio_button_checked</i> <span>Radio</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">label</i> <span>Label</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">toggle_on</i> <span>Toggle</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">crop_din</i> <span>Text Area</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">payment</i> <span>Dropdown</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">image</i> <span>Image</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">list</i> <span>List</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">grid_on</i> <span>Grid</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">subject</i> <span>Paragraph</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">view_day</i> <span>Heading</span>
                        </div>
                    </div>
                </li>
                <li className="list-group-item list-group-item-action">
                    <label className="lbl" data-toggle="collapse" data-target="#adv-comp-cont" aria-expanded="true" aria-controls="adv-comp-cont">Advanced Components</label>
                    <div id="adv-comp-cont" className="icon-cont">
                        <div className="icon rounded text-white d-inline-block bg-primary">
                            <i className="material-icons md-24">bar_chart</i> <span>Chart</span>
                        </div>
                        <div className="icon rounded text-white d-inline-block bg-primary" title="Floating Label Textbox">
                            <i className="material-icons md-24">text_format</i> <span>Float Box</span>
                        </div>
                    </div>
                </li>
                <li className="list-group-item list-group-item-action">
                    <label className="lbl" data-toggle="collapse" data-target="#cus-comp-cont" aria-expanded="true" aria-controls="cus-comp-cont">Custom Components</label>
                    <div id="cus-comp-cont" className="icon-cont">
                        ...
                    </div>
                </li>
            </ul>
        </div>
      );
    }
}