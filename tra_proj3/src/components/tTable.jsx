import React  from 'react';
import THead from "./tHead";
import TBody from "./tBody";

const TTable = ({data} = this.props) => {
    return (
        <table className="table table-dark">
          <THead/>
          <TBody data={data}/>         
        </table>
      );
}
 
export default TTable;