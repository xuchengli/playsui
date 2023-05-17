module game::forge {
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};

  struct Sword has key, store {
    id: UID,
    magic: u64,
    strength: u64,
  }

  struct Forge has key, store {
    id: UID,
    swords_created: u64,
  }

  fun init(ctx: &mut TxContext) {
    let admin = Forge {
      id: object::new(ctx),
      swords_created: 0,
    };
    transfer::transfer(admin, tx_context::sender(ctx));
  }

  public fun magic(self: &Sword): u64 {
    self.magic
  }

  public fun strength(self: &Sword): u64 {
    self.strength
  }

  public fun swords_created(self: &Forge): u64 {
    self.swords_created
  }

  #[test]
  public fun test_sword_create() {
    use sui::tx_context;
    use sui::transfer;

    let ctx = tx_context::dummy();

    let sword = Sword {
      id: object::new(&mut ctx),
      magic: 42,
      strength: 7,
    };

    assert!(magic(&sword) == 42 && strength(&sword) == 7, 1);

    let dummy_address = @0xcafe;
    transfer::transfer(sword, dummy_address);
  }
}
