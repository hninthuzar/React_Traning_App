import React from 'react';

const ActiveButton = ({onClickEvent} = this.props) => {
    return (  
        <button onClick={onClickEvent} className="btn btn-info" > Show Active </button>
    );
}
 
export default ActiveButton;