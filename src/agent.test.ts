const { SegenieAgent } = require("./index.ts");
const { test } = require("jest");

test("Segenie agent queries correctly", () => {
  const sa = new SegenieAgent("https://ic0.app");
  sa.getPortalsOfUser(
    "yljnt-ldv2w-okihn-sjewp-kxnj3-rakn6-vvjaz-xxjfu-fydg4-jxmum-sqe",
  );
});
