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
  state = {page: {html: "", css: "", js: "", libs: [], rows:[]}}
  render() {
    return (
      <div className="App container-fluid">
          <div className="App-header">
            <h2>Chikku 0.1</h2>
          </div>
          <div className="App-body row no-gutters">
              <div className="col-2">
                  <ToolsPane data={this.state.page}></ToolsPane>
                  <PropertiesPane data={this.state.page}></PropertiesPane>
              </div>
              <div className="col-10">
                  <ContentPane data={this.state.page}></ContentPane>
              </div>
          </div>
      </div>
    );
  }
}

