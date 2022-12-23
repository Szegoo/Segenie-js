const { HttpAgent, Actor } = require("@dfinity/agent");
const { IDL } = require("@dfinity/candid");
const { cbor } = require("@dfinity/agent");
const {idlFactory} = require("./idlFactory.js");
require('isomorphic-fetch');

console.log(idlFactory);
const mockResponse = {
  status: 'replied',
  reply: { arg: new Uint8Array([]) },
};

const httpAgent = new HttpAgent({
  host: "https://ic0.app",
  disableNonce: true,
});

const canisterId = "ooyw6-eqaaa-aaaap-qavrq-cai";

const actor = Actor.createActor(idlFactory, { canisterId, agent: httpAgent });

console.log(actor);

async function getPortal(id: number): Promise<any> { 
  const response = await actor.get_portal(id);
  console.log(response);
  return response;
}

getPortal(1);
