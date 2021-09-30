import React, { Component } from "react";

const ActiveBook = ({onlyActiveList} = this.props) => {
  return (
    <div className="text-center">
      <button className="btn btn-info" onClick={onlyActiveList}>
        Active List
      </button>
    </div>
  );
};

export default ActiveBook;
