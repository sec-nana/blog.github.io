import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Toolbar.css';
var newstr;
class Toolbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scale: 0,
            page:1,
            numPages:null
        };
    }
  
    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page ||
            this.state.numPages !== nextState.numPages||this.state.scale !== nextState.scale) {
            document.getElementById("pageInput").value=nextState.page;
                return true;
        }
        {
            return false;
        }
    }
    
    zoomIn(e) {
        if (this.props.onZoomIn) {
            this.props.onZoomIn(e);
        }
    }
    zoomOut(e) {
        if (this.props.onZoomOut) {
            this.props.onZoomOut(e);
        }
    }
    onPrevious(e) {
        if (this.props.onPrevious) {
            this.props.onPrevious(e);
        }
    }
    onNext(e) {
        if (this.props.onNext) {
            this.props.onNext(e);
        }
    }
    onPrint(e){
        if (this.props.onPrint) {
            this.props.onPrint(e);
        }
        
    }
    onText(e){
        if(e.keyCode==13)
         if (this.props.onText) {
            this.props.onText(e);
        }
    }
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state.scale !== nextState.scale) {
    //         return true;
    //     }
    //     return false;
    // }
    onFocus(e){
        console.log("onFocus=",e.target.value)
        document.getElementById("pageInput").value=e.target.value;
    }
    
    render() {
            return (<div className="Toolbar" >
            <button className="ZoomIn" onClick={(e) => this.zoomOut(e)}>缩小</button>
            <button className="ZoomOut" onClick={(e) => this.zoomIn(e)}>放大</button>
            <button className="ZoomIn" onClick={(e) => this.onPrevious(e)}>上一页</button>
            <input className="PageInput" id="pageInput" onFocus={(e)=>{this.onFocus(e)}} onKeyDown={(e)=>this.onText(e)}></input>
            <span className="NumPages">/{this.state.numPages}</span>
            <button className="ZoomIn" onClick={(e) => this.onNext(e)}>下一页</button>
            <button className="ZoomOut" onClick={(e) => this.onPrint(e)}>打印</button>
        </div>);
    }
}

Toolbar.propTypes = {
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
}

export default Toolbar;