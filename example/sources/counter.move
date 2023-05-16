module example::counter {
    use sui::transfer;
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};
    use sui::clock::{Self, Clock};
    use sui::event;

    struct Counter has key {
        id: UID,
        value: u64,
    }

    struct CountCollected has copy, drop {
        value: u64,
        timestamp_ms: u64,
    }

    fun init(ctx: &mut TxContext) {
        let counter_obj = Counter {
            id: object::new(ctx),
            value: 0
        };
        transfer::share_object(counter_obj);
    }

    public entry fun incr(counter: &mut Counter, clock: &Clock) {
        counter.value = counter.value + 1;

        event::emit(CountCollected { 
            value: counter.value,
            timestamp_ms: clock::timestamp_ms(clock),
        });
    }
}
