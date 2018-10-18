import React, { Component } from 'react';
import "./ComponentPane.css";
import Components from './Components';
export default class ComponentPane extends Component {
    static count = 0;
    cid = null;
    state = {data:{conf:{}, html:{}}};
    type = '';
    comList = {};
    props = {
        handleComponentChange: function(arg: Component) {}
    };
    constructor(props) {
        super(props);
        this.cid = ++ComponentPane.count;
        this.type = props.type;
        var comp = Components[this.type],
        data = this.state.data = props.data,
        confKeys = Object.getOwnPropertyNames(comp);
        confKeys.forEach(function (key, index) {
            data[key] = JSON.parse(JSON.stringify(comp[key]));
        });
        props.handleComponentChange(this);
    };
    setCurrentConf(e) {
        e.preventDefault();
        this.props.handleComponentChange(this);
    }
    getComponent() {
        var comp = this.state.data,
            // eslint-disable-next-line
            conf = comp.conf,
            // eslint-disable-next-line
            out = eval("`" + comp.html + "`");
        return out;
    }
    render() {
        var typeClass = '';
        if (this.type) {
            typeClass = this.type;
        }
        var compHtml = this.getComponent();
        return (
            <div className={`component-pane ${typeClass}`} id={`ComponentPane${this.cid}`}>
                <a href="#comp-settings" onClick={this.setCurrentConf.bind(this)} className="settings material-icons">settings_application</a>
                <div dangerouslySetInnerHTML={{__html: compHtml}} />
            </div>
        );
    };

}