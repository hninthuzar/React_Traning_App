
  /// let / var / const // 


  // var  function scope // 
  // function f1 (){

  //   for(var i =0; i<5 ; i ++){
  //     console.log(i); // 0 , 1 , 2 , 3, 4 //
  //   }

  //   console.log('outer loop '+ i);  // 5  ok // 

  // }



  // let  block scope // 
  function f1 (){
    const x =1;
    for(let i =0; i<5 ; i ++){

      const y = 1;
      console.log(i); // 0 , 1 , 2 , 3, 4 //
    }


    console.log ( x); //ok //
    console.log ( y); // error //

    console.log('outer loop '+ i);  // 5 not ok // 

  }


  // const >>  block scope //
  function f1 (){

    const x = 1;
    x =2;
  }


  f1();