module example::counter {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};

    struct Counter has key {
        id: UID,
        value: u64,
    }

    fun init(ctx: &mut TxContext) {
        let counter_obj = Counter {
            id: object::new(ctx),
            value: 0
        };
        transfer::share_object(counter_obj);
    }

    public entry fun incr(counter: &mut Counter) {
        counter.value = counter.value + 1;
    }
}
