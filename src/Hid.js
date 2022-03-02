/* eslint-disable default-case */
//=========================================================================================
//                      globals
//=========================================================================================

const JOYSTICK = 1678;
// const MOUSE = 1267;
const MOUSE = 14648;
let MapInstance;


//==========================================================================================
//                      enum events
//==========================================================================================


export const ACTION = {
    //====controlled by the 8th Bit====//
    RIGHT_BUTTON_ON_STICK: Symbol.for("RIGHT_JOY_STICK"),
    LEFT_BUTTON_ON_STICK: Symbol.for("LEFT_JOY_STICK"),
    TENTH: Symbol.for("TENTH"),
    NINTH: Symbol.for("NINTH"),

    //====controlled by the 7th Bit====//
    FIRST: Symbol.for("FIRST"),
    SECOND: Symbol.for("SECOND"),
    THIRD: Symbol.for("THIRD"),
    FOURTH: Symbol.for("FOURTH"),
    FIFTH: Symbol.for("FIFTH"),
    SIXTH: Symbol.for("SIXTH"),
    SEVENTH: Symbol.for("SEVENTH"),
    EIGHTH: Symbol.for("EIGHTH"),

    //====controlled by the 6th Bit====//
    ROTATE_RIGHT: Symbol.for("ROTATE_RIGHT"),
    ROTATE_LEFT: Symbol.for("ROTATE_LEFT"),

    //====controlled by the 4th Bit====//
    FRONT: Symbol.for("PUSH_FRONT"),
    BACK: Symbol.for("PUSH_BACK"),

    //====controlled by the 2th Bit====//
    RIGHT: Symbol.for("PUSH_RIGHT"),
    LEFT: Symbol.for("PUSH_LEFT"),

    NOTHING: Symbol.for("NOTHING"),
}
// Object.freeze(ACTION);



//=========================================================================================
//                      Mapper
//=========================================================================================


export const Mapper = class {

    actions = {};
    prevAction = ACTION.NOTHING;

    register = function (action, func) {
        this.actions[action] = func;
    };

    execute = function (action, value) {
        // if (action !== this.prevAction)
        // {
            this.prevAction = action;
            if(this.actions[action] !== undefined){
                this.actions[action](value);
            }
        // }
    }
};


//
// for (let k = 0; k < 10; k++) {
//     for (let i = 0; i < 1000 * 1000 * 1000; i++);

// sample for using this module
// const map = new Mapper();
// map.register(ACTION.NOTHING, ()=>{console.log("NOTHING")})
// map.register(ACTION.FIRST, ()=> {console.log("FIRST")})
// map.register(ACTION.SECOND, ()=>{console.log("SECOND")})
// map.register(ACTION.THIRD, ()=>{console.log("THIRD")})
// map.register(ACTION.FOURTH, ()=>{console.log("FOURTH")})
// map.register(ACTION.FIFTH, ()=>{console.log("FIFTH")})
// map.register(ACTION.SIXTH, ()=>{console.log("SIXTH")})
// map.register(ACTION.SEVENTH, ()=>{console.log("SEVENTH")})
// map.register(ACTION.EIGHTH, ()=>{console.log("EIGHTH")})
// map.register(ACTION.NINTH, ()=>{console.log("NINTH")})
// map.register(ACTION.TENTH, ()=>{console.log("TENTH")})
// map.register(ACTION.RIGHT_BUTTON_ON_STICK, ()=>{console.log("RIGHT_BUTTON_ON_STICK")})
// map.register(ACTION.LEFT_BUTTON_ON_STICK, ()=>{console.log("LEFT_BUTTON_ON_STICK")})
// map.register(ACTION.ROTATE_RIGHT, ()=>{console.log("ROTATE_RIGHT")})
// map.register(ACTION.ROTATE_LEFT, ()=>{console.log("ROTATE_LEFT")})
// map.register(ACTION.FRONT, ()=>{console.log("PUSHED FRONT")})
// map.register(ACTION.BACK, ()=>{console.log("PUSHED BACK")})
// map.register(ACTION.RIGHT, ()=>{console.log("PUSHED RIGHT")})
// map.register(ACTION.LEFT, ()=>{console.log("PUSHED LEFT")})
// start(map);

//
// for (let k of Object.keys(ACTION))
// {
//     console.log("k: " + k )
//     (k, ()=>{console.log(k)})
//     map.execute(ACTION[k]);
// }
//

//=========================================================================================
//                  function findMyDeviceInList(devices)
//=========================================================================================

function findMyDeviceInList(devices){

    if(devices === undefined)
        return null;

    for(let device of devices) {
        if(device.vendorId === JOYSTICK)
            // if(device.vendorId === MOUSE)
            return device;
    }
    return null;
}

//=========================================================================================
//                  function addListeners()
//=========================================================================================
function addListeners() {

    navigator.hid.addEventListener('disconnect', ({device}) => {
        console.log(`HID disconnected: ${device.productName}`);
    });

    navigator.hid.addEventListener('connect', ({device}) => {
        console.log(`HID connected: ${device.productName}`);
    });

}

//=========================================================================================
//                          main()
// =========================================================================================
export function start(mapInstance){
    if (!mapInstance) {
        throw new Error("a map instance is required when calling start(mapInstance)");
    }
    MapInstance = mapInstance;
    document.addEventListener('DOMContentLoaded', async () => {

        addListeners();

        var devices = await navigator.hid.getDevices();
        devices.forEach(device => {
            console.log(`HID: ${device.vendorId} ${device.productName} ${device.productId} ${device.opened}`);
        });
        var myDevice = findMyDeviceInList(devices);



        if(!myDevice) {
            let requestButton = document.getElementById("hid-device");
            requestButton.innerHTML = "click here to add a new device";
            requestButton.addEventListener("click", async () => {

                devices = await navigator.hid.requestDevice({filters: []});
                myDevice = findMyDeviceInList(devices);
                myDeviceDetails(myDevice);
            });
        }
        else
            myDeviceDetails(myDevice)

    });



    window.addEventListener("gamepadconnected", (event) => {

        // const first = document.getElementById("firstCinnection").innerHTML;

        // if(first === "true"){
        //     document.getElementById("firstCinnection").innerHTML = "false";
        //     return;
        // }
        // let requestButton = document.getElementById("hid-device");
        // requestButton.innerHTML = "welcome back! click here to connect the joystick";


        // console.log("A gamepad connected. welcome back!");
        //console.log(event.gamepad);
    });

}
// start()
//==========================================================================================
//                          function myDeviceDetails(myDevice)
//==========================================================================================


async function myDeviceDetails(myDevice) {

    if(myDevice === undefined)
        return;

    await myDevice.open();

    console.log(myDevice.vendorId + " is opened?- " + myDevice.opened);

    myDevice.addEventListener("inputreport", event => {
        const {data, device, reportId} = event;
        // console.log(data)
        const {action, value} = get_action(data);
        MapInstance.execute(action,value);

    });
}

// if (device.productId !== 28 && reportId !== 0) return;//?

// console.log(new Uint8Array(event.data.buffer));


// if (value === 0) return;

//if(value===0)
// console.log(data.buffer)
//const someButtons = { 1: "22", 2: "23", 4: "25"};
// console.log(`User pressed button ${value}.`);



//==========================================================================================
//          get_event
//==========================================================================================

const get_action = (data) => {

    switch (data.getUint8(7)) {
        case 1 :
            return {action: ACTION.NINTH}
        case 2:
            return {action: ACTION.TENTH}
        case 4:
            return {action: ACTION.LEFT_BUTTON_ON_STICK}
        case 8:
            return {action: ACTION.RIGHT_BUTTON_ON_STICK}

    }

    switch (data.getUint8(6)) {
        case 1:
            return {action: ACTION.FIRST}
        case 2:
            return {action: ACTION.SECOND}
        case 4:
            return {action: ACTION.THIRD}
        case 8:
            return {action: ACTION.FOURTH}
        case 16:
            return {action: ACTION.FIFTH}
        case 32:
            return {action: ACTION.SIXTH}
        case 64:
            return {action: ACTION.SEVENTH}
        case 128:
            return {action: ACTION.EIGHTH}
    }

    switch (data.getUint8(5)) {
        case 0:
            return {
                action: ACTION.ROTATE_LEFT,
                value: 255 - data.getUint8(4)
            }
        case 3:
            return {
                action: ACTION.ROTATE_RIGHT,
                value: data.getUint8(4),
            };

    }

    // switch (data.getUint8(3)) {
    //     case 1:
    //         // console.log(`joystick pushed forward`)
    //         if(data.getUint8(1) == 2 )
    //         return ACTION.FRONT
    //         j
    //     case 3:
    //         // console.log(`joystick pushed backward`)
    //         return ACTION.BACK
    // }
    switch (data.getUint8(3)) {
        case 0:
            return {
                action: ACTION.FRONT,
                value: 255 - data.getUint8(2)
            }
        case 3:
            return {
                action: ACTION.BACK,
                value: data.getUint8(2)
            }
    }

    switch (data.getUint8(1)) {
        case 0:
            return {
                action: ACTION.LEFT,
                value: 255 - data.getUint8(0)
            }
        case 3:
            return {
                action: ACTION.RIGHT,
                value: data.getUint8(0)
            };
        default:
            return {action: ACTION.NOTHING}
    }
}