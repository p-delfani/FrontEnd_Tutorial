// Javascript is a single-threaded langauge : 

myDisplayer("Hello");
{

}


function mySecond() {
  myDisplayer("Goodbye");
}

myFirst();
mySecond();

// promise : 

let myPromise = new Promise(function(myResolve, myReject) {
// "Producing Code" (May take some time)

  myResolve(); // when successful
  myReject();  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function(value) { /* code if successful */ },
  function(error) { /* code if some error */ }
);  

// resolve and reject : 

console.log("Start");

setTimeout(() => {
  console.log("This is asynchronous.");
}, 2000);

console.log("End");


