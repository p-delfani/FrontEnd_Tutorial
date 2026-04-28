let fakeUser = {
    id: 0,
    username: 'Fake User',
    password: 12909012
}


function showUserInfo (user) {
    
    return `UserName: ${fakeUser.username} And User Password: ${fakeUser.password}`
}

const userAli = {
    id: 1,
    username: 'Ali Ahmadi',
    password: 'ali_1290'
}



console.log(showUserInfo(userAli));

fakeUser.password = 1010

console.log(showUserInfo(userAli));

// input => ourput
// local scope vars && inputs => !global 
// No Sideeffect