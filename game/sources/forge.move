module game::forge {
  use sui::object::{Self, UID};
  use sui::transfer;
  use sui::tx_context::{Self, TxContext};

  const EInvalidSwordCreatedNumber: u64 = 1;

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

  public entry fun sword_create(forge: &mut Forge, magic: u64, strength: u64, recipient: address, ctx: &mut TxContext) {
    let sword = Sword {
      id: object::new(ctx),
      magic,
      strength,
    };
    transfer::transfer(sword, recipient);

    forge.swords_created = forge.swords_created + 1;
  }

  public entry fun sword_transfer(sword: Sword, recipient: address, _ctx: &mut TxContext) {
    transfer::transfer(sword, recipient);
  }

  #[test]
  public fun test_sword_create() {
    use sui::tx_context;
    use sui::transfer;
    use std::debug;

    let ctx = tx_context::dummy();

    let sword = Sword {
      id: object::new(&mut ctx),
      magic: 42,
      strength: 7,
    };

    debug::print(&sword);

    assert!(magic(&sword) == 42 && strength(&sword) == 7, 1);

    let dummy_address = @0xcafe;
    transfer::transfer(sword, dummy_address);
  }

  #[test]
  public fun test_sword_transactions() {
    use sui::test_scenario;

    let admin = @0xBABE;
    let initial_owner = @0xCAFE;
    let final_owner = @0xFACE;

    // first transaction to emulate module initialization
    let scenario_val = test_scenario::begin(admin);
    let scenario = &mut scenario_val;
    {
      init(test_scenario::ctx(scenario));
    };

    // second transaction executed by admin to create the sword
    test_scenario::next_tx(scenario, admin);
    {
      // Extract the Forge object
      let forge = test_scenario::take_from_sender<Forge>(scenario);
      // Verify number of created swords
      assert!(swords_created(&forge) == 0, EInvalidSwordCreatedNumber);

      // create the sword and transfer it to the initial owner
      sword_create(&mut forge, 42, 7, initial_owner, test_scenario::ctx(scenario));
      // Verify number of created swords
      assert!(swords_created(&forge) == 1, EInvalidSwordCreatedNumber);

      // Return the Forge object to the object pool
      test_scenario::return_to_sender(scenario, forge);
    };

    // debug::print_stack_trace();

    // third transaction executed by the initial sword owner
    test_scenario::next_tx(scenario, initial_owner);
    {
      // extract the sword owned by the initial owner
      let sword = test_scenario::take_from_sender<Sword>(scenario);
      // transfer the sword to the final owner
      sword_transfer(sword, final_owner, test_scenario::ctx(scenario));
    };

    // fourth transaction executed by the final sword owner
    test_scenario::next_tx(scenario, final_owner);
    {
      // extract the sword owned by the final owner
      let sword = test_scenario::take_from_sender<Sword>(scenario);
      // verify that the sword has expected properties
      assert!(magic(&sword) == 42 && strength(&sword) == 7, 1);
      // return the sword to the object pool (it cannot be simply "dropped")
      test_scenario::return_to_sender(scenario, sword);
    };
    test_scenario::end(scenario_val);
  }
}
