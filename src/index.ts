const axios = require("axios");

/*
{
  request_type: 'call',
  nonce: Uint8Array(8) [
    0, 1, 2, 3,
    4, 5, 6, 7
  ],
  canister_id: '2chl6-4hpzw-vqaaa-aaaaa-c',
  method_name: 'greet',
  arg: Uint8Array(0) [],
  sender: Principal { _arr: Uint8Array(1) [ 4 ], _isPrincipal: true }
}
*/

const icp = "https://ic0.app/";
console.log(new Uint8Array(0));

const ANONYMOUS_SUFFIX = 4;
const anonymous = new Uint8Array([ANONYMOUS_SUFFIX]);
console.log(anonymous);
//const backendCanisterId = "00000000000000010101"
const backendCanisterId = "ooyw6-eqaaa-aaaap-qavrq-cai";

const get_portals = `https://ic0.app/api/v2/canister/${backendCanisterId}/query`;

const canisterId = {
  _arr: [0, 0, 0, 0, 1, 240, 5, 99, 1, 1],
  _isPrincipal: true,
};

const body = {
  request_type: "query",
  canister_id: {
    _arr: new Uint8Array([0, 0, 0, 0, 1, 240, 5, 99, 1, 1]),
    _isPrincipal: true,
  },
  method_name: "get_portal",
  arg: new Uint8Array(0),
  sender: { _arr: new Uint8Array([4]), _isPrincipal: true },
  ingress_expiry: { _value: 1240000000000 },
};

/*axios.post(icp, { 
  body: {
    request_type: "query",
    canister_id: canisterId,
    method_name: "get_portal",
    arg: new Uint8Array(0),
    ingress_expiry: getNanoSecTime(),
    sender: { _arr: new Uint8Array(1) [ 4 ], _isPrincipal: true } 
  }
}).then((response: any) => {
  //console.log(response.status);
})*/

axios
  .post(get_portals, {
    headers: {
      "content-type": "application/cbor",
    },
    body: body,
  })
  .then((response: any) => {
    console.log(response.status);
  });

console.log("Hello");

function getNanoSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1] + 500000000;
}
