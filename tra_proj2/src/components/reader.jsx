import React, { Component } from 'react';

class Reader extends Component {
    state = {  }
    render() { 
        return ( 
            <h2> I am book's reader</h2>
         );
    }
} 
export default Reader;



export function reading() {
    console.log( 'i am reading function ');
}

