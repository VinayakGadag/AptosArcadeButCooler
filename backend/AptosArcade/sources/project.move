module MyModule::AptosArcade {
    use aptos_framework::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Struct representing a player's game statistics
    struct PlayerStats has store, key {
        high_score: u64,        // Player's highest score achieved
        total_games_played: u64, // Total number of games played
        total_tokens_earned: u64, // Total tokens earned from games
        games_won: u64,         // Number of games won
    }

    /// Struct representing the arcade game state
    struct ArcadeGame has store, key {
        total_players: u64,     // Total number of players registered
        prize_pool: u64,        // Total prize pool available
        game_fee: u64,          // Fee required to play a game (in APT)
    }

    /// Initialize the arcade game with initial settings
    public fun initialize_arcade(admin: &signer, game_fee: u64) {
        let arcade = ArcadeGame {
            total_players: 0,
            prize_pool: 0,
            game_fee,
        };
        move_to(admin, arcade);
    }

    /// Function for players to play a game and record their score
    public fun play_game(
        player: &signer, 
        arcade_owner: address, 
        score_achieved: u64
    ) acquires PlayerStats, ArcadeGame {
        let player_addr = signer::address_of(player);
        let arcade = borrow_global_mut<ArcadeGame>(arcade_owner);
        
        // Charge game fee
        let fee_payment = coin::withdraw<AptosCoin>(player, arcade.game_fee);
        coin::deposit<AptosCoin>(arcade_owner, fee_payment);
        arcade.prize_pool = arcade.prize_pool + arcade.game_fee;

        // Initialize or update player stats
        if (!exists<PlayerStats>(player_addr)) {
            let new_stats = PlayerStats {
                high_score: score_achieved,
                total_games_played: 1,
                total_tokens_earned: 0,
                games_won: 0,
            };
            arcade.total_players = arcade.total_players + 1;
            move_to(player, new_stats);
        } else {
            let stats = borrow_global_mut<PlayerStats>(player_addr);
            stats.total_games_played = stats.total_games_played + 1;
            
            // Update high score if current score is better
            if (score_achieved > stats.high_score) {
                stats.high_score = score_achieved;
                stats.games_won = stats.games_won + 1;
                
                // Record potential reward for new high score
                let reward_amount = arcade.game_fee / 2; // 50% of game fee as reward
                if (arcade.prize_pool >= reward_amount) {
                    stats.total_tokens_earned = stats.total_tokens_earned + reward_amount;
                    arcade.prize_pool = arcade.prize_pool - reward_amount;
                };
            };
        };
    }
}