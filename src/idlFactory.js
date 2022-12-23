module.exports.idlFactory = ({ IDL }) => {
  const Creator = IDL.Record({
    principal: IDL.Principal,
    name: IDL.Text,
  });
  const Portal = IDL.Record({
    id: IDL.Nat,
    creator: IDL.Principal,
    image_url: IDL.Opt(IDL.Text),
    name: IDL.Text,
    description: IDL.Text,
  });
  return IDL.Service({
    create_portal: IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
    get_creator_metadata: IDL.Func([], [IDL.Opt(Creator)], []),
    get_portal: IDL.Func([IDL.Nat], [IDL.Opt(Portal)], []),
    get_portals_of_caller: IDL.Func([], [IDL.Vec(Portal)], []),
    get_portals_of_creator: IDL.Func([IDL.Principal], [IDL.Vec(Portal)], []),
    set_creator_metadata: IDL.Func([IDL.Text], [IDL.Text], []),
    update_portal_metadata: IDL.Func(
      [IDL.Nat, IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
      [IDL.Text],
      [],
    ),
  });
};
