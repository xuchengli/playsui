module upgrade_package::counter {
  use sui::object::{Self, ID, UID};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};

  const VERSION: u64 = 1;

  struct Counter has key {
    id: UID,
    version: u64,
    admin: ID,
    value: u64,
  }

  struct AdminCap has key {
    id: UID,
  }

  const ENotAdmin: u64 = 0;
  const EWrongVersion: u64 = 1;

  fun init(ctx: &mut TxContext) {
    let admin = AdminCap {
      id: object::new(ctx),
    };

    transfer::share_object(Counter {
      id: object::new(ctx),
      version: VERSION,
      admin: object::id(&admin),
      value: 0,
    });

    transfer::transfer(admin, tx_context::sender(ctx));
  }

  public entry fun increment(c: &mut Counter) {
    assert!(c.version == VERSION, EWrongVersion);
    c.value = c.value + 1;
  }
}