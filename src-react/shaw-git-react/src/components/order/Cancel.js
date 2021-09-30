import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Input, Button, Form, Layout, Modal } from 'antd';
import { fetchOrder, updateOrder, sendCancelOrder, fetchUser } from "../../actions";
import { getRole } from "../../const";
import { levelCancelOrder, keyWaiter } from "../../actions/types";
const { Content } = Layout;

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends Component {
  state = {
    editing: false,
    isTextBox: false
  };

  toggleEdit = () => {
    
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave } = this.props;
    if(!e)
      return;

    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      let current = values.cancelQty;
      if(record.orgQty < current || current < 0){
        this.toggleEdit();
        handleSave(false);
        return;
      }

      let { orgQty, amount, price } = record;
      let newQty = orgQty - current;
      amount = price * newQty;
     
      values.curQty = newQty;
      values.amount = amount;
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;

    if(editing){
      return(
        <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(<Input type="number" ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
      )
    }else{
      return( 
      <div className="editable-cell-value-wrap" onClick={()=>this.toggleEdit(dataIndex)}>
        {children}
      </div>
      )
    }
  };

  render() {
    const { editable, dataIndex, title, record, index,handleSave, children,
      ...restProps } = this.props;

    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}
class Cancel extends Component {

  state = {
    dataSource: [],
    roles: []
  }

  columns = [
    { title: 'No', dataIndex: 'no' , width: '5%' },
    { title: 'Ban No', dataIndex: 'banNo', width: '10%' },
    { title: 'OrgWaiterID', dataIndex: 'orgWaiterId', width: '10%' },
    { title: 'Name', dataIndex: 'name' , width: '25%'},
    { title: 'Price', dataIndex: 'price' , width: '10%'},
    { title: 'OrgQty', dataIndex: 'orgQty' , width: '10%'},
    { title: 'CurQty', dataIndex: 'curQty' , width: '10%'},
    { title: 'CancelQty', dataIndex: 'cancelQty' , editable: true , width: '10%'},
    { title: 'Amount', dataIndex: 'amount' , width: '10%'},
  ];

  componentDidMount = () =>{
    const tableId = this.props.match.params.id;
    this.props.fetchOrder(tableId);
    this.props.fetchUser();
    let waiter = localStorage.getItem(keyWaiter);
    let roles = this.state.roles;
    if(waiter){
      waiter = JSON.parse(waiter);
      roles = getRole(waiter.WLevel);
    }
     
    this.setState({ roles });
  }

  handleSave = row => {
    if(!row)
      return;
    const { orders, updateOrder } = this.props;

    const newData = [...orders[1]];
    const index = newData.findIndex(item => row.BDID === item.BDID);
    const item = newData[index];
    item.curQty = row.curQty;
    item.Amount = row.amount;
    newData[index] = item;
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    
    orders[1] = newData;
    updateOrder(orders);
    this.setState({ dataSource: newData });
  };
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

  handleSendOrder = () => {
    const { dataSource }  = this.state; 
    const { orders, sendCancelOrder, history } = this.props;
    const datas = [];
    dataSource.forEach(data => {
      if(data.cancelQty > 0){
        let obj = {
          BDID : data.BDID,
          Qty : data.cancelQty
        }
        datas.push(obj);
      }
    });
    if(!datas || datas.length === 0)
      return;

    const resp = sendCancelOrder(orders[0].VrID, datas);
    if(resp){
      resp.then(res => {
        if(res.p_commit === true){
          history.push("/home");
        }else{
          this.showModal("Failed", res.p_commit);
        }
      });
    }
  }
  
  handelCancel = () => {
    this.props.history.push("/home");
  }

	render() {
    let  dataSource  = []; 
    const { orders } = this.props;
    
    if(orders[1]){
      orders[1].map((item, index) => {
        let no = index + 1;
        let cancelQty = 0; 
        let curQty = item.Qty;
        if(item.cancelQty)
          cancelQty = item.cancelQty;
        if(item.curQty > -1)
          curQty = item.curQty;

        let obj = {
          key: index,
          no,
          BDID: item.BDID,
          banNo: item.BonNo,
          orgWaiterId: item.WaiterID,
          name: item.MName,
          price: item.Price,
          orgQty: item.Qty,
          curQty: curQty,
          cancelQty: cancelQty,
          amount: item.Amount
        }
       return dataSource.push(obj);
      })
    }
    let totalAmount = 0;
    if(dataSource.length === 1){
      totalAmount = dataSource[0].amount;
    }else if (dataSource.length > 1){
      dataSource.forEach(a => {
        totalAmount +=  a.amount
      });
    }
    
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });

    const { roles } = this.state;
    const tableName = this.props.match.params.name;
    let info = {};
    if(orders && orders[0])
      info = orders[0];
    let date = "";
    const str = info.VDate;
    if(str){
     date = str.substring(0,str.indexOf("T"))
    }
    
		return (
      <Content style={{ padding: '10px' }}>
        <div style={{ textAlign: "right", fontWeight: "bolder", margin: "10px 0px"}}>
          Table Name : <span style={{marginRight: '10%'}}>{tableName}</span>
          <span style={{marginRight: '10%'}}>{info.VrID}</span>
          <span>{date}</span>
        </div>
        <Table className="ggtable" components={components} rowClassName={() => 'editable-row'} bordered
              dataSource={dataSource} columns={columns} pagination={false} footer={() =>`Total : `+totalAmount}/>
        <div style={{textAlign: "center", marginTop: 8}}>
          {
            roles.indexOf(levelCancelOrder) > -1 ? (
              <Button onClick={this.handleSendOrder} style={{marginRight: "2%"}} size='large' type="primary">Send Cancel (Cancel လုပ္မည္)</Button>
            ): null
          }
          <Button size='large' onClick={this.handelCancel}>Cancel</Button>
        </div>
      </Content>
		);
	}
}

const mapStateToProps = ({ orders }) => {
	return { orders };
};

export default connect( mapStateToProps, { fetchOrder, updateOrder, sendCancelOrder, fetchUser })(Cancel);

