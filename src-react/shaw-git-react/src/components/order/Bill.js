import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Button, Layout, Radio, Row, Col } from 'antd';

import { fetchBillOrder, sendBillOrder, fetchUser } from "../../actions";
import { getRole } from "../../const";
import { levelPrintBill, levelPaid, keyWaiter } from "../../actions/types";
const { Content } = Layout;

class Bill extends Component {

  state = {
    print: "Slip",
    roles: []
  }

  componentDidMount = () => {
    const tableId = this.props.match.params.id;
    this.props.fetchBillOrder(tableId);
    this.props.fetchUser();
    let waiter = localStorage.getItem(keyWaiter);
    let roles = this.state.roles;
    if(waiter){
      waiter = JSON.parse(waiter);
      roles = getRole(waiter.WLevel);
    }
     
    this.setState({ roles });
  }

  columns = [
    { title: 'No', dataIndex: 'no' },
    { title: 'Name', dataIndex: 'name' },
    { title: 'Price', dataIndex: 'price' },
    { title: 'Qty', dataIndex: 'qty' },
    { title: 'Amount', dataIndex: 'amount' },
    { title: 'P/F', dataIndex: 'pf' }
  ];

  footerCol = [
    { dataIndex: 'first'},{ dataIndex: 'second'},{ dataIndex: 'third'},{ dataIndex: 'fourth' }
  ]
  footerData = [
    { key: 1, first: 'Total Amount', second: '20000', third: 'Commercial Tax', fourth: '1000'}
  ]

  footer = () => {
    let info = {};
    if(this.props.bills[0])
      info = this.props.bills[0];
    return(
      <div style={{width: '50%', fontWeight: "bolder"}}>
        <Row><Col span={6}>Total Amount </Col> <Col span={6}>{info.TAmt}</Col><Col span={6}>Commercial Tax</Col><Col span={6}>{info.CTaxAmt}</Col></Row>
        <Row><Col span={6}>Total FOC    </Col><Col span={6}>{info.FAmt}</Col><Col span={6}>Services Charges </Col><Col span={6}>{info.STaxAmt}</Col></Row>
        <Row><Col span={6}>Grand Total  </Col><Col span={6}>{info.GrandTotal}</Col><Col span={6}>Net Total        </Col><Col span={6}>{info.NetAmt}</Col></Row>
      </div>  
    )
  }

  onChange = e => {
    this.setState({
      print: e.target.value,
    });
  };

  handelSendBill = event => {
    const { print } = this.state;
    const { bills, sendBillOrder, history } = this.props;
    sendBillOrder(event, print, bills[0]);
    history.push("/home");
  }

  handelCancel = () => {
    this.props.history.push("/home");
  }

	render() {
    let info = {};
    const { bills } = this.props;
    const tableName = this.props.match.params.name;
    const tableStatus = this.props.match.params.status;
    if(bills && bills[0])
      info = bills[0];
    let date = "";
    const str = info.VDate;
    if(str){
     date = str.substring(0,str.indexOf("T"))
    }
    
    const datas = [];
    if(bills && bills[1]){
      bills[1].map((item, index) => {
        let no = index + 1;
        let obj = { 
          key: index, 
          BDID: item.BDID, 
          no, 
          name: item.MName, 
          price: item.Price, 
          qty: item.Qty, 
          amount: item.Amount, 
          pf: item.Pno
        }
        return datas.push(obj);
      })
    }

    const { roles } = this.state;
    
		return (
      <Content style={{ padding: '10px' }}>
        <div style={{ margin: '10px 0px' }}>
          <span style={{marginRight: 10}}>Print</span> 
          <Radio.Group onChange={this.onChange} value={this.state.print}>
            <Radio value="A5">A5</Radio>
            <Radio value="Slip">Slip</Radio>
          </Radio.Group>
          <div style={{ textAlign: "right", fontWeight: "bolder"}}>
            Table Name : <span style={{marginRight: '10%'}}>{tableName}</span>
            <span style={{marginRight: '10%'}}>{info.VrID}</span>
            <span>{date}</span>
          </div>
        </div>
        
        <Table bordered columns={this.columns} dataSource={datas} footer={this.footer} pagination={false} />
        <div style={{textAlign: "center", marginTop: 8}}>
        {
          roles.indexOf(levelPrintBill) > -1 && tableStatus !== '3' ?(
            <Button style={{marginRight: "2%", width: "100px"}} size='large' type="primary" onClick={() => this.handelSendBill("Bill")}>Bill</Button>
          ): null
        }
        {
          roles.indexOf(levelPaid) > -1 && tableStatus === '3' ? (
            <Button style={{marginRight: "2%", width: "100px"}} size='large' type="primary" onClick={() => this.handelSendBill("Paid")}>Paid</Button>
          ): null
        }
        {
          roles.indexOf(levelPaid) > -1 && roles.indexOf(levelPrintBill) > -1 && tableStatus !== '3' ? (
            <Button style={{marginRight: "2%", width: "100px"}} size='large' type="primary" onClick={() => this.handelSendBill("BillNPaid")}>{'Bill & Paid'}</Button>
          ): null
        }
        <Button size='large' style={{ width: "100px"}} onClick={this.handelCancel}>Cancel</Button>
        </div>
      </Content>
		);
	}
}

const mapStateToProps = ({ bills }) => {
	return { bills };
};

export default connect( mapStateToProps, { fetchBillOrder, sendBillOrder, fetchUser })(Bill);
