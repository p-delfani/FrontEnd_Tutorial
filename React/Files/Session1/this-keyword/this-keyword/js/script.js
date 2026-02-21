// this = این

function clickHandler (param) {
    param.style.background = 'red'
    console.log('Click', param);
}

function showValue () {
    console.log(this);
}

let user = {
    id: 12,
    username: 'Amin',
    age: 22,
    showAge: function () {
        console.log(this.age);
    }
}

user.showAge()