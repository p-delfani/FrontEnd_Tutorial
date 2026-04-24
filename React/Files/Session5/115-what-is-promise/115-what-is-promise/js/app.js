let loginPromise = new Promise((resolve, reject) => {
    let isLogin = false

    if (isLogin) {
        resolve("User is login :))")
    } else {
        reject('User is not login :((')
    }
})



loginPromise
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log("Error in promise: " + err);
    })