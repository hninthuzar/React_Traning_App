import React from "react";

const TBody = ({data} = this.props) => {   
  return (
    <tbody>
      {data.map((x) => (
        <tr key={x.id}>
          <td>{x.id}</td>
          <td>{x.first}</td>
          <td>{x.last}</td>
          <td>{x.age}</td>
          <td>{x.active ? "Acitve" : "Inactive"}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TBody;
