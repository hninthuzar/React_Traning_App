import React, { Component } from "react";
import { Layout, Card, Select } from "antd";
import { connect } from "react-redux";
import { Table, Input, Button, Popconfirm, Row, Col, Form, Icon } from 'antd';
import { fetchMenuGroup, fetchMenus, fetchTnos, updateMenus, fetchUser, sendOrder, fetchTables } from "../../actions";
import { keyWaiter, levelOrder } from "../../actions/types";
import { getRole } from "../../const";

const { Content } = Layout;
const { Option } = Select;


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
    isTextBox: false,
    isTno:false,
    isPno:false,
    pno: "N",
    tno: "---",
    tnoKey: "0"
  };

  toggleEdit = dataIndex => {
    let isTextBox = false;
    let isTno = false;
    let isPno = false;
    if(dataIndex === "remark"){
      isTextBox = true;
    }else if(dataIndex === 'pno'){
      isPno = true;
    }else if(dataIndex === 'tno'){
      isTno = true;
    }
    
    const editing = !this.state.editing;
    this.setState({ editing, isTextBox, isTno, isPno }, () => {
      if (editing && !isTno && !isPno) {
        this.input.focus();
      }
    });
  };

  handlePnoChange = value => {
    this.setState({
      pno : value
    })
  }

  handleTnoChange = value => {
    const { tnos } = this.props;
    const index = tnos.findIndex(tn => tn.TnoID === value);
    const tempTno = tnos[index];
    this.setState({
      tno : tempTno.TName,
      tnoKey: value
    })
  }

  save = e => {
    const { record, handleSave } = this.props;
    if(!e)
      return;

    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      if(values['qty']){
        let amt = values.qty * record.price;
        values.amount = amt;
      }

      if(values['tno']){
        const { tnoKey, tno } = this.state;
        values.tnoKey = tnoKey;
        values.tno = tno;
      }

      this.toggleEdit("");
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    
    this.form = form;
    const { children, dataIndex, record, title, tnos } = this.props;
    const { editing, isTextBox, isTno, isPno } = this.state;

    if(editing && isTextBox){
      return(
        <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [],
          initialValue: record[dataIndex],
        })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
      </Form.Item>
      )
    }else if(editing && !isTextBox && isPno){
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
        })(<Select style={{ width: '100%' }} onPressEnter={this.save} onBlur={this.save}  onChange={this.handlePnoChange} >
            <Option value="P">P</Option>
            <Option value="N">N</Option>
            <Option value="F">F</Option>
          </Select>
          )}
      </Form.Item>
      )
    }else if(editing && !isTextBox && isTno){
      return(
        <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [],
          initialValue: record[dataIndex],
        })(<Select style={{ width: '100%' }} onPressEnter={this.save} onBlur={this.save}  onChange={this.handleTnoChange} >
            <Option value="0">---</Option>
            {
              tnos.map((item, index) => <Option key={index} value={item.TnoID}>{item.TName}</Option>)
            }
          </Select>
          )}
      </Form.Item>
      )
    }else if(editing && !isTextBox){
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

class Order extends Component {
	state = {
    menus : [],
    dataSource: [],
    count: 1,
    tableId:0,
    roles: [],
    collapse: false,
    leftStyle: { xs:24, sm:24, md:8, lg:8, xl:8},
    rightStyle: { xs:24, sm:24, md:16, lg:16, xl:16 }
  };
  constructor(props) {
    super(props);
    this.columns = [
      { title: 'No', dataIndex: 'no', width: 30},
      { title: 'Name', dataIndex: 'name', width: 80},
      { title: 'Price', dataIndex: 'price', width: 50},
      { title: 'Qty', dataIndex: 'qty', width: 50, editable: true },
      { title: 'Amount', dataIndex: 'amount', width: 50 },
      { title: 'PNo', dataIndex: 'pno', width: 50, editable: true },
      { title: 'TNo', dataIndex: 'tno', width: 100, editable: true },
      { title: 'Remark', dataIndex: 'remark', width: 100, editable: true },
      { title: ' ', dataIndex: 'operation', fixed: 'right', width: 30,
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
              <Icon type="delete" />
            </Popconfirm>
          ) : null,
      },
    ];
  }
  
  componentDidMount() {
    this.props.fetchMenuGroup();
    const { menuGroup } = this.props;
    if(menuGroup[0]){
      this.props.fetchMenus(menuGroup[0].MGroupName);
    }
    const tableId = this.props.match.params.id;
    this.props.fetchTnos();
    this.props.fetchUser();
    this.props.fetchTables();
    let waiter = localStorage.getItem(keyWaiter);
    let roles = this.state.roles;
    if(waiter){
      waiter = JSON.parse(waiter);
      roles = getRole(waiter.WLevel);
    }
     
    this.setState({ tableId, roles });
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = (item) => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      no: count,
      name: item.MName,
      remark: '',
      price: item.CusPrice,
      qty: 1,
      amount: item.CusPrice,
      pno: 'N',
      tno: "---",
      tnoKey: "0",
      menuId: item.MID
    }

    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  handlePicture = (item) =>{
    
    let menus = this.props.menus;
    const index = menus[0].findIndex(men => men.MID === item.MID);
    item.isShowPic = !item.isShowPic;
    menus[0][index] = item;

    this.props.updateMenus(menus);
    this.setState({ menus })
  }
  
  
  handleChange = value => {
    this.props.fetchMenus(value);
  }

  handleSendOrder = () =>{
    const { dataSource, tableId } = this.state;
    let waiter = localStorage.getItem(keyWaiter);
    if(waiter)
      waiter = JSON.parse(waiter);

    let newDataSource = [];

    if(!dataSource || dataSource.length === 0)
      return;
  
    dataSource.map(data => {
      let obj = {
        "ReqID" : tableId,
        "WaiterID" : waiter.WaiterID,
        "MID":  data.menuId,
        "Remark" : data.remark,
        "Qty" : data.qty,
        "Price" : data.price,
        "Amount" : data.amount, 
        "Tno" : data.tnoKey,
        "Pno": data.pno
      }
     return newDataSource.push(obj);
    }) 
    this.props.sendOrder(newDataSource);
    newDataSource = [];
    this.props.history.push("/home");
  }

  handleCancel = () => {
    this.props.history.push("/home");
  }

  onCollapse = () =>{
    let { collapse , leftStyle, rightStyle } = this.state;
    this.setState({ collapse : !collapse, leftStyle: rightStyle, rightStyle: leftStyle });
  }

  handleChangeTable = value =>{
    this.setState({ tableId: value });
  }
  
	render() {
    
    let { menuGroup, menus, tnos, tables } = this.props;
    let propsMenus = [] 
    if(menus[0]){
      propsMenus = menus[0];
    }
    let defaultSelect = "";
    if(menuGroup[0]){
      defaultSelect = menuGroup[0].MGroupName;
    }else{
      menuGroup = [];
    }

    const { dataSource, roles, collapse, tableId, leftStyle, rightStyle } = this.state;
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
          tnos,
        }),
      };
    });
    
    const gridLayout = {textAlign: "center", display: "inline-block",
       margin: "4px", cursor:"pointer", maxWidth: 200, width: 200, wordBreak: 'break-word'};
    const arrowDirection = collapse ? "double-left" : "double-right";
		return (
      
			<Content style={{ padding: '10px' }}>
        <Row gutter={24}>
          <Col {...leftStyle}>
            <Table components={components} rowClassName={() => 'editable-row'} bordered
              dataSource={dataSource} columns={columns} pagination={false} scroll={{ x: '130%' }}/>
            <div style={{textAlign: "center", marginTop: 8}}>
              {
                roles.indexOf(levelOrder) > -1 ? (
                  <Button onClick={this.handleSendOrder} style={{marginRight: "2%"}} size='large' type="primary">Send Order (မွာမည္)</Button>
                ) : null
              }
              <Button size='large' onClick={this.handleCancel}>Cancel</Button>
            </div>
          </Col>
          <Col {...rightStyle}>
            <div style={{marginBottom : 10}}>
            <Button shape="circle" icon={arrowDirection} style={{marginRight: '1%'}} onClick={this.onCollapse}/>
            Table Name: { tableId > 0 ? <Select defaultValue={tableId} style={{width: "20%", marginRight: '1%'}} onChange={this.handleChangeTable}>
              {
                tables.map((item, index) => <Option key={index} value={item.TRID}>{item.TRName}</Option>)
              }
            </Select> : null }
            Menu : <Select defaultValue={defaultSelect} style={{width: "40%"}} onChange={this.handleChange}>
              {
                menuGroup.map((item, index) => <Option key={index} value={item.MGroupName}>{item.MGroupName}</Option>)
              }
            </Select>
            </div>
            {
              propsMenus.map((item, index) => (
                <Card id="order" key={index} style={gridLayout}>
                  {item.isShowPic ? <img alt="food logo" className="foodImg" src={ `data:image/png;base64, ` + item.Pic } /> : null}
                  <div>{ item.MName }</div>
                  <p>{ item.CusPrice }</p>
                  <Icon onClick={() => this.handlePicture(item)} style={{ fontSize: "large", marginRight: "50%" }} type="picture"/>
                  <Icon onClick={() => this.handleAdd(item)} style={{fontSize: "large"}}type="plus-circle" />
                </Card>
              ))
            }
          </Col>
        </Row>

			</Content>
		);
	}
}

const mapStateToProps = ({ menuGroup, menus, tnos, tables }) => {
	return { menuGroup, menus, tnos, tables };
};

export default connect( mapStateToProps, 
  { fetchMenuGroup, fetchMenus, fetchTnos, updateMenus, fetchUser, sendOrder, fetchTables })(Order);

