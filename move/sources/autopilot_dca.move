module autopilot_dca::dca {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::timestamp;
    
    struct DCAConfig has key {
        frequency: u64,
        amount: u64,
        from_token: address,
        to_token: address,
        last_execution: u64
    }

    public entry fun create_dca_config(
        account: &signer,
        frequency: u64,
        amount: u64,
        from_token: address,
        to_token: address
    ) {
        let config = DCAConfig {
            frequency,
            amount,
            from_token,
            to_token,
            last_execution: timestamp::now_seconds()
        };
        move_to(account, config);
    }

    public entry fun execute_dca<FromCoin, ToCoin>(
        account: &signer,
        amount: u64
    ) acquires DCAConfig {
        let account_addr = signer::address_of(account);
        let config = borrow_global_mut<DCAConfig>(account_addr);
        
        assert!(
            timestamp::now_seconds() >= config.last_execution + config.frequency,
            1 // Error: Too early for next DCA
        );

        // Execute swap through DEX (PontemSwap/Econia integration)
        // Implementation depends on chosen DEX

        config.last_execution = timestamp::now_seconds();
    }

    public fun get_config(account: address): (u64, u64, address, address, u64) acquires DCAConfig {
        let config = borrow_global<DCAConfig>(account);
        (
            config.frequency,
            config.amount,
            config.from_token,
            config.to_token,
            config.last_execution
        )
    }
}