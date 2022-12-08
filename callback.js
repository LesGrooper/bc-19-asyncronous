/**
 * Callback
 * sebuah funcition yang di jadikan parameter dalam function lain
 */

// Contoh 1:
// const mainFunction = (cb) => {
//     cb("Rezki");
//     console.log("Main Function");
// }

// mainFunction((name) => {
//     console.log(`Hello, ${name}!`);
// });

// contoh 2

// const callBackHell = () =>{
//     console.log(`Callback hell`);

// };

// callBackHell = () => {

//     callBackHell = () => {
//         callBackHell = () => {
//             callBackHell = () => {
//                 callBackHell = () => {
//                     console.log("callback 1")
//                 }
//                 console.log("callback 2")
//             }
//             console.log("callback 2")
//         }
//         console.log("callback 3")
//     }
//     console.log("callback 4")
// }

// Dalam call back atau asyncronous ada metode yang bernama Promise
// yang memiliki 3 status: yaitu;
/**
 * 1. Fullfield
 * 2. Rejected
 * 3. Pending
 */

// Contoh 1:

const janji = new Promise((resolve, reject) => {
  //console.log(typeof Promise) adalah object
  try {
    resolve("berhasil");
  } catch (err) {
    reject(err);
  }
});

// console.log(janji);

// janji
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const janjiManis = (name) => {
  return new Promise((resolve, reject) => {
    try {
      resolve("janji manis terbukti!" + name);
    } catch (err) {
      reject(err);
    };
  });
};


janjiManis("Rezki").then(result => {
    console.log(result);
}).catch(err => {
    console.log(err);
})
