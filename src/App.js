import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import Viewer from './Viewer.js';
import Toolbar from './Toolbar.js';
import pdfjsLib from 'pdfjs-dist';
let a ;
let count=1;
//var pdfDoc = null,
 var   pageNum = 1,
    pageRendering = false,
    pageNumPending = null,
    scale = 0.8,
    //canvas = document.getElementById('the-canvas'),
    //ctx = canvas.getContext('2d');
    canvas,
    ctx;
class App extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    document.body.height=document.getElementById("pdfViewer").height;
    let loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then((doc) => {
      console.log("doc=",doc);
      doc.getPage(1).then(page=>{
        a=page.pageInfo.view[3]
      })

      // var newstr = document.getElementById("pdfViewer");   //获得需要打印的内容
      // console.log("newStr=",newstr);
      console.log(`Document ${this.props.url} loaded ${doc.numPages} page(s)`);
      this.viewer.setState({
        doc
      });
      this.toolbar.setState({
        page:1,
        numPages:doc.numPages
      });
      
    }, (reason) => {
      console.error(`Error during ${this.props.url} loading: ${reason}`);
    });
    //监听滚动事件
    document.getElementById("viewer").onscroll =() =>{
       let a = document.getElementById("viewer").scrollTop;
       this.toolbar.setState({
         page: parseInt(a/1067)+1
       })
    }
    var newstr = document.getElementById("the-canvas");   //获得需要打印的内容
    //var newstr = this.viewer.refs;
    console.log("newStr=",newstr);
    console.log("llll===",document.body.innerHTML)
    //document.body.innerHTML=newstr; 
  }
  // componentDidMount(){
  //    let loadingTask = pdfjsLib.getDocument(this.props.url);
  //   loadingTask.promise.then((doc) => {
  //     for (var i = 1; i <=doc.numPages; i++) {
  //      doc.getPage(i).then((page)=> {
  //     var scale = 1;
  //     var viewport = page.getViewport(scale);
  //      a=page.pageInfo.view[3]
  //     //
  //     // Prepare canvas using PDF page dimensions
  //     //
  //     var canvas = document.createElement('canvas');
  //     var canvasList=document.getElementById("lala")
  //     canvas.id="canvas"+i;
  //     var context = canvas.getContext('2d');
  //     canvas.height = viewport.height;
  //     canvas.width = viewport.width;

  //     // 这里拿body当pdf容器
  //     canvasList.appendChild(canvas);

  //     //
  //     // Render PDF page into canvas context
  //     //
  //     page.render({canvasContext: context, viewport: viewport});
  //   });
  // }

  // })
  // }
  zoomIn=(e) =>{
    this.viewer.setState({
      scale: this.viewer.state.scale * 1.1
    });
  }
  zoomOut=(e) =>{
    let b=(a+275)*this.viewer.state.scale;
    console.log(this.viewer.state.scale)
    console.log(a)
    document.getElementById("viewer").scrollTop=b*(count++)
   // console.log(document.getElementById("lala").scrollTop);
    console.log(document.getElementById("viewer").scrollTop);
    this.viewer.setState({
      scale: this.viewer.state.scale / 1.1
    });
  }
   onPrevious=(e) =>{
    if(this.toolbar.state.page===1){
      return
    }else{
        let b=(a+275)*this.viewer.state.scale;
        document.getElementById("viewer").scrollTop-=b
         this.toolbar.setState({
          page: this.toolbar.state.page-1
          });
    }
  }
  onNext=(e) =>{
    if(this.toolbar.state.page === this.toolbar.state.numPages){
      return
    }else{
       let b=(a+275)*this.viewer.state.scale;
       document.getElementById("viewer").scrollTop+=b
        this.toolbar.setState({
       page: this.toolbar.state.page+1
       })
    }
  }
  onText=(e)=>{
    if(parseInt(e.target.value)===this.toolbar.state.page)
      return;
    else{
    if(parseInt(e.target.value)>this.toolbar.state.page && parseInt(e.target.value) <= this.toolbar.state.numPages){
       let b=(a+275)*this.viewer.state.scale;
       document.getElementById("viewer").scrollTop+=b*(parseInt(e.target.value)-this.toolbar.state.page)
        this.toolbar.setState({
       page: parseInt(e.target.value)
       })
    }else if(parseInt(e.target.value)<this.toolbar.state.page && parseInt(e.target.value) >=1){
       let b=(a+275)*this.viewer.state.scale;
       document.getElementById("viewer").scrollTop-=b*(this.toolbar.state.page-parseInt(e.target.value))
        this.toolbar.setState({
       page: parseInt(e.target.value)
       })
    }else if(parseInt(e.target.value)>this.toolbar.state.numPages){
      let b=(a+275)*this.viewer.state.scale;
       document.getElementById("viewer").scrollTop+=b*(this.toolbar.state.numPages-this.toolbar.state.page)
        this.toolbar.setState({
       page: this.toolbar.state.numPages
       })
    }else{
       let b=(a+275)*this.viewer.state.scale;
       document.getElementById("viewer").scrollTop-=b*(this.toolbar.state.page-1)
        this.toolbar.setState({
       page: 1
       })
    }
  }
  }
  displayScaleChanged=(e)=> {
    this.viewer.setState({
      scale: e.scale
    });
  }
  // onPrint=(e)=>{
  //    //window.document.body.innerHTML = window.document.getElementById('viewer').innerHTML;  
  //     console.log(e);
  //    window.print(); 
  //     //window.location.reload();
  // }
  // onPrint=(e)=>{
  //   // var headstr = "<html><head><title></title></head><body>";
  //   // var footstr = "</body>";
  //   // var newstr = document.all.item("pdfViewer").innerHTML;
  //   // var oldstr = document.body.innerHTML;
  //   // document.body.innerHTML = headstr+newstr+footstr;
  //   // window.print();
  //   // document.body.innerHTML = oldstr;
  //   // return false;
  //  window.print();
  // }
  onbeforeprint=()=>{
    var headstr = "<html><head><title></title></head><body>";
   var footstr = "</body>";
   var oldstr = document.body.innerHTML;   //保存原先网页的代码
    var newstr = document.getElementById("pdfViewer").innerHTML;   //获得需要打印的内容
    document.body.innerHTML=headstr+newstr+footstr; //将网页内容更改成需要打印
  }
 onPrint=(e) =>{
  //  var newstr = document.all.item("pdfViewer").innerHTML;
  //   var oldstr = document.body.innerHTML;
  //   document.body.innerHTML = newstr;
    window.print();
  // document.body.innerHTML = oldstr;
    return false;
    //window.print();


    }


 renderPage=(num)=> {
  pageRendering = true;
   let loadingTask = pdfjsLib.getDocument(this.props.url);
    loadingTask.promise.then((doc) => {
    doc.getPage(num).then((page)=> {
    var viewport = page.getViewport(scale);
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);


    renderTask.promise.then(function() {
      pageRendering = false;
      if (pageNumPending !== null) {
        this.renderPage(pageNumPending);
        pageNumPending = null;
      }
    });
  });

  //document.getElementById('page_num').textContent = num;
})
  }


queueRenderPage=(num) =>{
  if (pageRendering) {
    pageNumPending = num;
  } else {
    this.renderPage(num);
  }
}
  render() {
    console.log("5555===",document.body.innerHTML)
    return (
      <div className="App">
        <div className="App-header " id="header">
          <h2>Welcome to PDF.js</h2>
          </div>
        <Toolbar
          ref={(ref) => this.toolbar = ref} 
          onZoomIn={(e) => this.zoomIn(e)}
          onZoomOut={(e) => this.zoomOut(e)}
          onPrevious={(e) => this.onPrevious(e)}
          onNext={(e) => this.onNext(e)}
          onText={(e)=>this.onText(e)}
          onPrint={(e)=>this.onPrint(e)}
          ></Toolbar> 
        <div className="App-body" id="the-canvas">
        {/* startPrint */}
            <Viewer 
            ref={(ref) => this.viewer = ref}
            onScaleChanged={(e) => this.displayScaleChanged(e)}
            onPrint={(e)=>this.onPrint(e)}></Viewer>
            {/* endPrint */}
        </div>
       
        
      </div>
    );
  }
}

App.propTypes = {
  url: PropTypes.string, 
};

export default App;
 