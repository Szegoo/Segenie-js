const axios = require("axios");
// @ts-ignore
import borc from 'borc';
import * as cbor from 'simple-cbor';
import { CborEncoder, CborValue, SelfDescribeCborSerializer } from 'simple-cbor';

////////////// CUSTOM SERIALIZE
class PrincipalEncoder implements CborEncoder<Principal> {
  public get name() {
    return 'Principal';
  }

  public get priority() {
    return 0;
  }

  public match(value: any): boolean {
    return value && value._isPrincipal === true;
  }

  public encode(v: Principal): cbor.CborValue {
    return cbor.value.bytes(v._arr);
  }
}

class BufferEncoder implements CborEncoder<ArrayBuffer> {
  public get name() {
    return 'Buffer';
  }

  public get priority() {
    return 1;
  }

  public match(value: any): boolean {
    return value instanceof ArrayBuffer || ArrayBuffer.isView(value);
  }

  public encode(v: ArrayBuffer): cbor.CborValue {
    return cbor.value.bytes(new Uint8Array(v));
  }
}

const serializer = SelfDescribeCborSerializer.withDefaultEncoders(true);
serializer.addEncoder(new PrincipalEncoder());
serializer.addEncoder(new BufferEncoder());

export enum CborTag {
  Uint64LittleEndian = 71,
  Semantic = 55799,
}

/**
 * Encode a JavaScript value into CBOR.
 */
export function encode(value: any): ArrayBuffer {
  return serializer.serialize(value);
}

////////////// END

interface Principal {
  _arr: Uint8Array,
  _isPrincipal: boolean,
}

const backendCanisterId = "ooyw6-eqaaa-aaaap-qavrq-cai";

const get_portals = `https://ic0.app/api/v2/canister/${backendCanisterId}/query`;

const canisterId = {
  _arr: [0, 0, 0, 0, 1, 240, 5, 99, 1, 1],
  _isPrincipal: true,
};

const principal: Principal = { _arr: new Uint8Array([4]), _isPrincipal: true };

const body = {
  request_type: "query",
  canister_id: backendCanisterId,
  method_name: "get_portal",
  arg: new Uint8Array(0),
  sender: principal,
  ingress_expiry: { _value: 1260000000000 },
  nonce: new Uint8Array([
    0, 1, 2, 3,
    4, 5, 6, 7
  ])
};

const encodedBody = encode(body);

const request = 
{
  reactNative: { __nativeResponseType: 'base64' },
  method: 'POST',
  headers: { 'Content-Type': 'application/cbor' },
  body: encodedBody,
}

console.dir(request, {maxArrayLength: null});

console.log("Request: ");
console.log(request);

axios
  .post(get_portals, request)
  .then((response: any) => {
    //console.log(response.status.statusCode);
  });

function getNanoSecTime() {
  var hrTime = process.hrtime();
  return hrTime[0] * 1000000000 + hrTime[1] + 500000000;
}
