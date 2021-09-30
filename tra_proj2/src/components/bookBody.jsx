import React, { Component } from 'react';

const BookBody = ( {bookData} = this.props) => {        
    return ( 
        <tbody>
            {bookData.map((x) => (
              <tr key={x.id}>
                <td> {x.id}</td>
                <td>{x.first}</td>
                <td> {x.last}</td>
                <td> {x.age}</td>
                <td> {x.active == true ? "True" : "False"}</td>
              </tr>
            ))}
          </tbody>
     );
}
 
export default BookBody;