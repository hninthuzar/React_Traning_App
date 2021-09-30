import React, { Component } from "react";
import BookHeader from "./bookHeader";
import BookBody from "./bookBody";

const BookTable = ({data} = this.props) => {
  return (
    <table className="table table-dark">
      <BookHeader />
      <BookBody bookData={data} />
    </table>
  );
};

export default BookTable;
