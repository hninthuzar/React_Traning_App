import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Layout, Popover, Button, Modal } from 'antd';
import { Link } from "react-router-dom";

import { fetchUser, fetchTables, fetchMenuGroup, sendDirectPaidOrder } from "../actions";

import { Auxi } from "./Auxi";
import { keyWaiter, levelReOrder, levelViewBill, levelCancelOrder, levelOrder, levelPaid } from "../actions/types";
import { getRole, TIME_FOR_FETCH_TABLE } from "../const";

const { Content } = Layout;

export class Landing extends Component {

  state = {
    roles: []
  }
	componentDidMount = () => {
		this.props.fetchUser();
    this.props.fetchTables();
    this.props.fetchMenuGroup();

    let waiter = localStorage.getItem(keyWaiter);
    let roles = [];
    if(waiter !== null && waiter !== "null"){
      waiter = JSON.parse(waiter);
      roles = getRole(waiter.WLevel);
    }
    this.setState({ roles });

    this.fetchTablesEveryGivenTime();
  };
  
  fetchTablesEveryGivenTime = () => {
    try {
      let timer = setInterval(async () => {
        await this.props.fetchTables();
      }, TIME_FOR_FETCH_TABLE * 1000);
      localStorage.setItem("timer", timer);
    } catch(e) {
      console.error("Cannot fetch tables ", e);
    }
  }

 getBackgroudColor = status =>{
   
	if(status === 1 ){
    //red
		return "#e74c3c";
	}else if(status === 2 ){
    //yellow
    return "#f1c40f";
	}else if(status === 3 ){
    //blue
    return "#3498db";
	}
	return "white";
 }

 sendDirectOrder = async tableId => {
  const { bills, sendDirectPaidOrder, fetchTables } = this.props;
  await sendDirectPaidOrder(tableId);

  if(bills.p_commit === true){
    this.showModal("Successful", "Direct Paid successful");
  }else{
    this.showModal("Failed", "Failed to paid");
  }
  
  await fetchTables();
 }

showModal(title, message) {
  
  let secondsToGo = 5;
  const modal = Modal.success({
    title,
    content: message,
  });
  setTimeout(() => {
    modal.destroy();
  }, secondsToGo * 1000);
}

 getLayout = color => {
   return  { width: 134 , textAlign: "center", display: "inline-block", margin: "4px", cursor:"pointer", background: color};
 }
  
  content = ({ TRID, TRName, Status }) => {
    const { roles } = this.state;
    return ( 
	<div>
    {
      roles.indexOf(levelReOrder) > -1 ? (
      <div>
        <Link to={"/order/"+ TRID + "/"+ TRName}><Button block style={{color : "#e74c3c", borderColor: "#e74c3c"}}>ReOrder</Button></Link> 
      </div>
      ): null
    }
    {
      roles.indexOf(levelViewBill) > -1 ? (
      <div style={{margin: '6px auto'}}>
        <Link to={"/bill/"+ TRID + "/"+ TRName + "/"+ Status}><Button block style={{color : "#3498db", borderColor: "#3498db"}}>Bill</Button> </Link> 
      </div>
      ): null
    }
    {
      roles.indexOf(levelCancelOrder) > -1 ? (
      <div>
        <Link to={"/cancel/"+ TRID + "/"+ TRName}><Button block>Cancel</Button></Link> 
      </div>
      ): null
    }
    </div>
  )
  }

  getTable = item => {
    const color = this.getBackgroudColor(item.Status);
    const roles = this.state.roles;
    let gridLayout = this.getLayout(color);
  
    if(item.Status === 0 || item.Status === 2){
      if(roles.indexOf(levelOrder) > -1){
        return (
          <Link to={"/order/"+ item.TRID + "/"+ item.TRName}>
            <Card style={gridLayout}>
            <h4>{ item.TRName }</h4>
            </Card>
          </Link>
       )
      }else{
        return (
          <Card style={gridLayout}>
          <h4>{ item.TRName }</h4>
          </Card>
       )
      }
      
    }else if(item.Status === 3){
      if(roles.indexOf(levelPaid) > -1){
        return (
          <Link to={"/bill/"+ item.TRID + "/"+ item.TRName + "/"+ item.Status}>
           <Card style={gridLayout}>
           <h4>{ item.TRName }</h4>
           </Card>
          </Link>
       )
      }else{
        return (
          <Card style={gridLayout}>
            <h4>{ item.TRName }</h4>
          </Card>
       )
      }
      
    }else {
      return (
        <Popover content={this.content(item)} trigger="click">
          <Card style={gridLayout}>
            <h4>{ item.TRName }</h4>
          </Card>
        </Popover>
      )
    }
  }
 

	render() {
		const { tables } = this.props;
		if(tables.length === 0){
			return <p>Loading...</p>
    }
		return (
			<Content style={{ padding: '20px' }}>
				{ tables.map(item => <Auxi key={item.TRID}>{this.getTable(item)}</Auxi>) }
			</Content>
		);
	}
}
const mapStateToProps = ({ auth, tables, bills }) => {
	return { auth, tables, bills };
};

export default connect( mapStateToProps, { fetchUser, fetchTables, fetchMenuGroup , sendDirectPaidOrder })(Landing);
