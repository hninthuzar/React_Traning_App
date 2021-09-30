import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchItems, fetchCustomers } from "../actions";

class Home extends Component {
  state = {};
  componentDidMount = () => {
    this.props.fetchItems();
    this.props.fetchCustomers();
  };
  render() {
    const { items, customers } = this.props;
    return (
      <div>
        <h1> Home</h1>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Items</td>
              <td>{items.length}</td>
            </tr>
            <tr>
              <td>Customers</td>
              <td>{customers.length}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ items, customers }) => {
  return { items, customers };
};

export default connect(mapStateToProps, { fetchItems, fetchCustomers })(Home);
