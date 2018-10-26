import React, { Component } from 'react';
import "./Header.css";
export default class Header extends Component {
    state = {data: [], dataNew: {}};
    formChange(e) {
        var target = e.target,
            dataNew = JSON.parse(JSON.stringify(this.state.dataNew));
        dataNew[target.id] = target.value;
        this.setState({dataNew: dataNew});
    }
    addLibrary(e) {
        e.preventDefault();
        var data = JSON.parse(JSON.stringify(this.state.data));
        data.push(this.state.dataNew);
        this.setState({"data": data});
        this.setState({'dataNew': {nodeModName: "", nodeModVer: "", pathToJs: "", pathToCss: ""}});
    }
    constructor(props) {
        super(props);
        this.state.data = props.data.libs;
    }
    render() {

        return (
            <React.Fragment>
            <h2>Chikku 0.1</h2>
            <div className="header-buttons">
                <button className="btn btn-secondary btn-sm">Open A Project</button>
                <button className="btn btn-secondary btn-sm">Save As Project</button>
                <button className="btn btn-secondary btn-sm">Save Config</button>
                <button className="btn btn-secondary btn-sm">Save As Component</button>
            </div>
            <div className="action-buttons">
                <div class="dropdown">
                    <a class="btn btn-secondary btn-sm dropdown-toggle" href="#libraries" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Libraries
                    </a>
                    {this.showLibs()}
                </div>
                <a href="#add-libararies" class="add-lib-btn" data-toggle="modal" data-target="#addLibModal">
                    <i className="material-icons md-24" title="Add Libraries">library_add</i>
                </a>
            </div>
            <div className="modal fade" id="addLibModal" tabindex="-1" role="dialog" aria-labelledby="addLibModalLabel" aria-hidden="true">
                {this.getAddLibModal()}
            </div>
            </React.Fragment>
        );
    }
    getLib(libs) {
        var out,
            libHtml = libs.map(function (lib, index) {
            if (lib.nodeModName) {
                return (
                    <a class="dropdown-item" href="#a">{lib.nodeModName} - {lib.nodeModVer} </a>
                );
            } else if (lib.pathToJs) {
                return (
                    <a class="dropdown-item" href="#b">{lib.pathToJs}</a>
                );
            } else if (lib.pathToCss) {
                return (
                    <a class="dropdown-item" href="#c">{lib.pathToJs}</a>
                );
            }
            return "";
        });
        if (libHtml.length) {
            out = libHtml;
        } else {
            out = (
                <label>No added libraries.</label>
            );
        }
        return out;
    }
    showLibs(): any {
        var libs = this.state.data;
        return (
            <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" x-placement="bottom-start">
                {this.getLib(libs)}
            </div>
        );
    }
    getAddLibModal(): any {
        var addDisabled = "disabled",
            data = this.state.dataNew;
        if (data.pathToJs || data.pathToCss) {
            addDisabled = "";
        }
        return (
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="addLibModalLabel">Add Library</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-5">
                                <label for="nodeModName">Node Module Name</label>
                            </div>
                            <div className="col">
                                <input id="nodeModName" value={data.nodeModName} type="text" onChange={this.formChange.bind(this)}></input>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <label for="nodeModVer">Version</label>
                            </div>
                            <div className="col">
                                <input id="nodeModVer" value={data.nodeModVer} type="text" onChange={this.formChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <label for="pathToJs">Path To Js</label>
                            </div>
                            <div className="col">
                                <input id="pathToJs" value={data.pathToJs} type="text" onChange={this.formChange.bind(this)}></input>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-5">
                                <label for="pathToCss">Path To Css</label>
                            </div>
                            <div className="col">
                                <input id="pathToCss"  value={data.pathToCss} type="text" onChange={this.formChange.bind(this)}></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" disabled={addDisabled} onClick={this.addLibrary.bind(this)} data-dismiss="modal">Add</button>
                    </div>
                </div>
            </div>
        )
    }
;
}