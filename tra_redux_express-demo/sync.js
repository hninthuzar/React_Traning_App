///-------------------------Async Default -------------------------------------- ///

// async //

// // first order //
// console.log( 'init');

// //second order //
// setTimeout(() => {
//     console.log('a');     //  backend call >>  network >> api >>  delay 3 seconds //
// }, 3000);

// // third order //
// console.log('b ');





///-------------------------Async Default but modift as sync-------------------------------------- ///

function timeout() {
    return new Promise((resolve)=>setTimeout(() => {
        console.log("a");
        resolve();
    }, 3000));
}

myFun = async () => {
  // first order //
  console.log("init");

  //second order //
  await timeout();

  // third order //
  console.log("b ");
};

myFun();






///-------------------------Sync Default -------------------------------------- ///

// // fun1(); >> loop
// // fun2() ; >> infinite loop
// // fun3() ;

// // sync // C# / Java //

// // first order //
// console.log( 'init');

// //second order //  waiting..  ////
// setTimeout(() => {
//     console.log('a');     //  backend call >>  network >> api >>  delay 3 seconds //
// }, 3000);

// // third order //
// console.log('b ');
