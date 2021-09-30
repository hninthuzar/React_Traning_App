import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchItems } from "../actions";

class Item extends Component {
    state = {  }    
    componentDidMount = () => {
        this.props.fetchItems();
      };
    render() { 
        const { items } = this.props;
        return (
          <div>
            <h1> Item</h1>
            <table className="table">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Unit</th>
                </tr>
              </thead>
              <tbody>
                {
                  items.map(x=>(
                    <tr key={x.item_id}>
                      <td>{x.item_id}</td>
                      <td>{x.item_name}</td>
                      <td>{x.qty}</td>
                      <td>{x.unit}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        );
    }
}
 

const mapStateToProps = ({ items }) => {
    return { items };
  };
  
  
export default connect(mapStateToProps, { fetchItems })(Item);

  