import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/popper.js/dist/umd/popper.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import ToolsPane from "./ToolsPane";
import ContentPane from "./ContentPane";
import PropertiesPane from "./PropertiesPane";
export default class App extends Component {
  state = {page: {html: "", css: "", js: "", libs: [], rows:[], config: {}}, currComp: {}, currCompData:{conf:{}}};
    handleComponentChange(comp) {
        this.setState({currComp: comp});
        this.setState({currCompData: comp.state.data.conf});
    };
    handleConfigChange(changedConf) {
        var data = JSON.parse(JSON.stringify(this.state.currComp.state.data));
        data.conf = changedConf;
        this.state.currComp.setState({data: data})
    };
    render() {
        return (
          <div className="App container-fluid">
              <div className="App-header clearfix">
                <h2>Chikku 0.1</h2>
                <div className="header-buttons">
                  <button className="btn btn-secondary btn-sm">Open A Project</button>
                  <button className="btn btn-secondary btn-sm">Save As Project</button>
                  <button className="btn btn-secondary btn-sm">Save Config</button>
                  <button className="btn btn-secondary btn-sm">Save As Component</button>
                </div>
              </div>
              <div className="App-body row no-gutters">
                  <div className="col-2">
                      <ToolsPane data={this.state.page}></ToolsPane>
                      <PropertiesPane data={this.state.currCompData} handleConfigChange={this.handleConfigChange.bind(this)}></PropertiesPane>
                  </div>
                  <div className="col-10">
                      <ContentPane data={this.state.page} handleComponentChange={this.handleComponentChange.bind(this)}></ContentPane>
                  </div>
              </div>
          </div>
        );
    }
}

