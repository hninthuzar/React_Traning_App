import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCustomers } from "../actions";

class Customer extends Component {
  state = {};

  componentDidMount = () => {
    this.props.fetchCustomers();
  };

  render() {
    const { customers } = this.props;
    return (
      <div>
        <h1> Customer</h1>{" "}
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((x) => (
              <tr key={x.id}>
                <td>{x.id}</td>
                <td>{x.name}</td>
                <td>{x.address}</td>
                <td>{x.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ customers }) => {
  return { customers };
};

export default connect(mapStateToProps, { fetchCustomers })(Customer);
