import React, { Component } from 'react';
import "./PropertiesPane.css";
export default class PropertiesPane extends Component {
    state = {data:{}};
    constructor(props) {
        super(props);
        this.state.data = props.data;
    };
    propChange(e) {
        e.preventDefault();
        var data = JSON.parse(JSON.stringify(this.state.data));
        data[e.target.attributes['data-key'].value] = e.target.value;
        this.setState({data: data});
        this.props.handleConfigChange(data);
    }
    getPropRows() {
        var that = this,
            config = this.state.data,
            configKeys = Object.getOwnPropertyNames(config);
        var out = configKeys.map(function (key, index) {
            return (
              <div className="row prop" key={index}>
                  <div className="col-4 prop-key"><label title={key} htmlFor={`propVal${index}`}>{key}</label></div>
                  <div className="col-8 prop-val" id={`propVal{index}`}><input type="text" value={config[key]}data-key={key} onChange={that.propChange.bind(that)}></input></div>
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
    
    render() {
      return (
        <div className="properties-pane" >
          <div className="title">Properties</div>
          {this.getPropRows()}
        </div>
      );
    }
}