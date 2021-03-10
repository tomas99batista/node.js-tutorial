// const square = function (x) {
//     return x * x;
// }

// const square = (x) => {
//     return x * x;
// }

// const square = (x) => x * x;

// console.log(square(3));

const event = {
    name: 'birthday',
    guestList: ['tomas', 'jen', 'mike'],
    printGuestList () {
        console.log(`guest list for event: ${this.name}`);

        this.guestList.forEach((guest) => {
            console.log(`${guest} goes to the event: ${this.name}`);
        })
    }
}

event.printGuestList();