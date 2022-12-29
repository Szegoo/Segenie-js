const { Principal } = require("@dfinity/principal");
const { HttpAgent, Actor } = require("@dfinity/agent");
const { IDL } = require("@dfinity/candid");
const { idlFactory } = require("./idlFactory.js");
require("isomorphic-fetch");

const CANISTER_ID = "ooyw6-eqaaa-aaaap-qavrq-cai";

module.exports = class SegenieAgent {
  private actor: typeof Actor;

  constructor(host: String) {
    const httpAgent = new HttpAgent({
      host,
      disableNonce: true,
    });

    this.actor = Actor.createActor(idlFactory, {
      canisterId: CANISTER_ID,
      agent: httpAgent,
    });
  }

  public async getPortalsOfUser(user: String): Promise<any> {
    console.log(this.actor);
    let principal = Principal.from(user);
    const response = await this.actor.get_portals_of_user(principal);
    console.log(response);
    return response;
  }
};
