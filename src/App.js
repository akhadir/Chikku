import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/popper.js/dist/umd/popper.min.js';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import ToolsPane from "./ToolsPane";
import ContentPane from "./ContentPane";
import PropertiesPane from "./PropertiesPane";
import Header from "./Header";
export default class App extends Component {
    state = {page: {html: "", css: "", js: "", libs: [], rows:[], config: {}}, currComp: {}, currCompData:{conf:{}}};
    // setState = function (obj) {};
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
                <Header data={this.state.page}></Header>
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

