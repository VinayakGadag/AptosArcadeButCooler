import React, { useState, useEffect } from 'react';
import { Gamepad2, Trophy, Coins, Users, Play, Wallet, Star, TrendingUp } from 'lucide-react';

const AptosArcade = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerStats, setPlayerStats] = useState({
    highScore: 0,
    totalGames: 0,
    tokensEarned: 0,
    gamesWon: 0
  });
  const [arcadeStats, setArcadeStats] = useState({
    totalPlayers: 156,
    prizePool: 2.5,
    gameFee: 0.1
  });

  // Simulate connecting wallet
  const connectWallet = async () => {
    // In a real app, this would connect to Petra/Martian wallet
    setIsConnected(true);
    setAccount('0xe2b1b4f066730f337930a8beacebaea30343820f95844de086a61fe4601bc046');
    
    // Simulate loading player stats
    setPlayerStats({
      highScore: 1250,
      totalGames: 23,
      tokensEarned: 1.8,
      gamesWon: 7
    });
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount(null);
    setPlayerStats({
      highScore: 0,
      totalGames: 0,
      tokensEarned: 0,
      gamesWon: 0
    });
  };

  // Simple game simulation
  const playGame = async () => {
    if (!isConnected) return;
    
    setIsPlaying(true);
    setGameScore(0);
    
    // Simulate game playing
    const gameInterval = setInterval(() => {
      setGameScore(prev => {
        if (prev >= 2000) {
          clearInterval(gameInterval);
          endGame(prev);
          return prev;
        }
        return prev + Math.floor(Math.random() * 50) + 10;
      });
    }, 100);
    
    // Auto-end game after 3 seconds
    setTimeout(() => {
      clearInterval(gameInterval);
      endGame(gameScore);
    }, 3000);
  };

  const endGame = (finalScore) => {
    setIsPlaying(false);
    
    // Update stats if new high score
    if (finalScore > playerStats.highScore) {
      setPlayerStats(prev => ({
        ...prev,
        highScore: finalScore,
        totalGames: prev.totalGames + 1,
        gamesWon: prev.gamesWon + 1,
        tokensEarned: prev.tokensEarned + 0.05
      }));
    } else {
      setPlayerStats(prev => ({
        ...prev,
        totalGames: prev.totalGames + 1
      }));
    }
    
    // Reset score after showing result
    setTimeout(() => setGameScore(0), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-128 h-128 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="w-12 h-12 text-cyan-400 mr-4" />
            <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Aptos Arcade
            </h1>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Play, compete, and earn APT tokens in the ultimate blockchain arcade experience
          </p>
        </header>

        {/* Wallet Connection */}
        <div className="flex justify-center mb-8">
          {!isConnected ? (
            <button
              onClick={connectWallet}
              className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 px-8 py-4 rounded-xl font-bold text-white flex items-center gap-3 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </button>
          ) : (
            <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-xl px-6 py-3 flex items-center gap-4">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">
                {account?.slice(0, 6)}...{account?.slice(-4)}
              </span>
              <button
                onClick={disconnectWallet}
                className="text-red-400 hover:text-red-300 ml-2"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Arcade Stats */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              Arcade Stats
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Players</span>
                <span className="text-white font-bold">{arcadeStats.totalPlayers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Prize Pool</span>
                <span className="text-green-400 font-bold">{arcadeStats.prizePool} APT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Game Fee</span>
                <span className="text-yellow-400 font-bold">{arcadeStats.gameFee} APT</span>
              </div>
            </div>
          </div>

          {/* Player Stats */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              Your Stats
            </h3>
            {isConnected ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">High Score</span>
                  <span className="text-yellow-400 font-bold flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    {playerStats.highScore.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Played</span>
                  <span className="text-white font-bold">{playerStats.totalGames}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Games Won</span>
                  <span className="text-green-400 font-bold">{playerStats.gamesWon}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tokens Earned</span>
                  <span className="text-cyan-400 font-bold">{playerStats.tokensEarned} APT</span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">Connect wallet to view stats</p>
            )}
          </div>

          {/* Game Area */}
          <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Play className="w-5 h-5 text-purple-400" />
              Game Zone
            </h3>
            <div className="text-center">
              {gameScore > 0 && (
                <div className="mb-4">
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {gameScore.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-400">Current Score</div>
                </div>
              )}
              
              <button
                onClick={playGame}
                disabled={!isConnected || isPlaying}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200 ${
                  !isConnected || isPlaying
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                }`}
              >
                {isPlaying ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Playing...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play Game
                  </>
                )}
              </button>
              
              {!isConnected && (
                <p className="text-gray-500 text-sm mt-2">Connect wallet to play</p>
              )}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-400" />
            Leaderboard
          </h3>
          <div className="space-y-4">
            {[
              { rank: 1, address: '0x1234...5678', score: 2850, earned: '0.15 APT' },
              { rank: 2, address: '0x9abc...def0', score: 2650, earned: '0.12 APT' },
              { rank: 3, address: '0x2468...ace0', score: 2400, earned: '0.10 APT' },
              { rank: 4, address: isConnected ? account.slice(0, 6) + '...' + account.slice(-4) : '0x1111...2222', score: playerStats.highScore || 1250, earned: `${playerStats.tokensEarned || 0.08} APT` },
              { rank: 5, address: '0x8765...4321', score: 1100, earned: '0.05 APT' }
            ].map((player, index) => (
              <div key={index} className={`flex items-center justify-between p-4 rounded-xl ${
                player.address.includes(account?.slice(0, 6)) ? 'bg-purple-500/20 border border-purple-500/40' : 'bg-gray-800/50'
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    player.rank === 1 ? 'bg-yellow-500 text-black' :
                    player.rank === 2 ? 'bg-gray-300 text-black' :
                    player.rank === 3 ? 'bg-amber-600 text-white' :
                    'bg-gray-700 text-white'
                  }`}>
                    {player.rank}
                  </div>
                  <span className="text-gray-300">{player.address}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{player.score.toLocaleString()}</div>
                  <div className="text-green-400 text-sm">{player.earned}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-400">
          <p>Built on Aptos Blockchain • Powered by Move Smart Contracts</p>
        </footer>
      </div>
    </div>
  );
};

export default AptosArcade;