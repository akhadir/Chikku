import React, { Component } from 'react';
import "./PropertiesPane.css";
export default class PropertiesPane extends Component {
    state = {data:{}};
    constructor(props) {
        super(props);
        this.state.data = props.data;
    };
    getPropRows() {
        var config = this.state.data,
            configKeys = Object.getOwnPropertyNames(config);
        var out = configKeys.map(function (key, index) {
            return (
              <div className="row prop" key={index}>
                  <div className="col-4 prop-key"><label title={key} htmlFor={`propVal${index}`}>{key}</label></div>
                  <div className="col-8 prop-val" id={`propVal{index}`}><input type="text" value={config[key]}></input></div>
              </div>
            );
        });
        return out;
    };
    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({data: this.props.data});
        }
    };
    test() {
      console.log(this.state.data);
      this.forceUpdate();
    };
    render() {
      return (
        <div className="properties-pane" >
          <div className="title" onClick={this.test.bind(this)}>Properties</div>
          {this.getPropRows()}
        </div>
      );
    }
}