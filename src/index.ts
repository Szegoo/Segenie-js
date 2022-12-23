const { Principal } = require("@dfinity/principal");
const { HttpAgent, Actor } = require("@dfinity/agent");
const { IDL } = require("@dfinity/candid");
const { idlFactory } = require("./idlFactory.js");
require("isomorphic-fetch");

const CANISTER_ID = "ooyw6-eqaaa-aaaap-qavrq-cai";

class SegenieAgent {
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
    // TODO - update this to get_portals_of_user
    let principal = Principal.from(user);
    const response = await this.actor.get_portals_of_creator(principal);
    console.log(response);
    return response;
  }
}

// TODO - move this to an actual test file.
const sa = new SegenieAgent("https://ic0.app");
sa.getPortalsOfUser("2vxsx-fae");
