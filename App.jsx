import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function BungeeCalculator() {
  const [mass, setMass] = useState('');
  const [startHeight, setStartHeight] = useState('');
  const [jumperHeight, setJumperHeight] = useState('');
  const [unstretchedLength, setUnstretchedLength] = useState('');
  const [result, setResult] = useState(null);

  // Given constants
  const NO_GO_ZONE = 0.1;
  const BUFFER = 0.2;
  const SPRING_CONSTANT = 4.5;
  const GRAVITY = 9.8;
  const ENDING_HEIGHT = 0.3;

  const calculateBungeeJump = () => {
    const m = parseFloat(mass);
    const h0 = parseFloat(startHeight);
    const hJumper = parseFloat(jumperHeight);
    const L = parseFloat(unstretchedLength);

    if (!m || !h0 || !hJumper || !L || m <= 0 || h0 <= 0 || hJumper <= 0 || L <= 0) {
      alert('Please enter valid positive numbers for all fields! ✨');
      return;
    }

    // Calculate total energy in the system
    const totalEnergy = m * h0 * GRAVITY;

    // Calculate ending gravitational energy
    const endingGPE = ENDING_HEIGHT * m * GRAVITY;

    // Calculate ending elastic energy
    const endingElasticPE = totalEnergy - endingGPE;

    // Calculate distance bungee cord stretched
    const stretchDistance = Math.sqrt((2 * endingElasticPE) / SPRING_CONSTANT);

    // Calculate string added
    const stringAdded = h0 - stretchDistance - L - ENDING_HEIGHT - hJumper;

    // Check how close to optimal (0.31m would be perfect)
    const optimalDistance = ENDING_HEIGHT - 0.31;
    const distanceFromOptimal = Math.abs(optimalDistance);

    setResult({
      totalEnergy: totalEnergy.toFixed(2),
      endingGPE: endingGPE.toFixed(2),
      endingElasticPE: endingElasticPE.toFixed(2),
      stretchDistance: stretchDistance.toFixed(2),
      stringAdded: stringAdded.toFixed(2),
      endingHeight: ENDING_HEIGHT.toFixed(2),
      distanceFromOptimal: distanceFromOptimal.toFixed(3),
      isOptimal: ENDING_HEIGHT >= 0.30 && ENDING_HEIGHT <= 0.32
    });
  };

  const resetForm = () => {
    setMass('');
    setStartHeight('');
    setJumperHeight('');
    setUnstretchedLength('');
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400 p-4 flex items-center justify-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-pink-400">
        <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 p-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 text-pink-200 opacity-20 text-9xl">✨</div>
          <div className="absolute bottom-0 left-0 text-purple-200 opacity-20 text-9xl">💖</div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <Sparkles size={40} className="text-yellow-300" />
                <div>
                  <h1 className="text-4xl font-bold">Barbie's Bungee Jump Calculator</h1>
                  <p className="text-lg opacity-90">✨ Let's calculate your perfect jump! ✨</p>
                </div>
                <Heart size={40} className="text-pink-300 fill-pink-300" />
              </div>
              <div className="hidden md:block bg-white rounded-2xl px-6 py-3 shadow-xl border-4 border-white">
                <svg width="240" height="90" viewBox="0 0 260 100">
                  <text 
                    x="130" 
                    y="65" 
                    fontFamily="'Brush Script MT', cursive" 
                    fontSize="90" 
                    fontWeight="900"
                    fill="#FF1493"
                    textAnchor="middle"
                    stroke="#C71585"
                    strokeWidth="0.5"
                    style={{fontStyle: 'italic', letterSpacing: '3px'}}
                  >
                    Barbie
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 border-4 border-pink-300 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <Sparkles className="text-pink-500 flex-shrink-0 mt-1" size={24} />
              <div>
                <p className="text-pink-800 font-bold text-lg">Fun Physics Time! 🎀</p>
                <p className="text-purple-700 mt-2">Enter your measurements and watch the magic happen!</p>
                <div className="mt-3 text-sm text-gray-700 bg-white rounded-lg p-3">
                  <p className="font-semibold text-pink-600">Given Values:</p>
                  <p>🎯 Spring Constant: <span className="font-bold">4.5 N/m</span></p>
                  <p>🎯 Buffer: <span className="font-bold">0.2 m</span></p>
                  <p>🎯 No-Go Zone: <span className="font-bold">0.1 m</span></p>
                  <p>🎯 Ending Height: <span className="font-bold">0.3 m</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-lg font-bold text-pink-600 mb-2">
                💕 Mass of Jumper (kg)
              </label>
              <input
                type="number"
                step="0.01"
                value={mass}
                onChange={(e) => setMass(e.target.value)}
                placeholder="e.g., 70"
                className="w-full px-4 py-3 border-4 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none transition text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-pink-600 mb-2">
                🌟 Starting Height (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={startHeight}
                onChange={(e) => setStartHeight(e.target.value)}
                placeholder="e.g., 50"
                className="w-full px-4 py-3 border-4 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none transition text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-pink-600 mb-2">
                👤 Height of Jumper (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={jumperHeight}
                onChange={(e) => setJumperHeight(e.target.value)}
                placeholder="e.g., 1.7"
                className="w-full px-4 py-3 border-4 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none transition text-lg"
              />
            </div>

            <div>
              <label className="block text-lg font-bold text-pink-600 mb-2">
                📏 Unstretched String Length (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={unstretchedLength}
                onChange={(e) => setUnstretchedLength(e.target.value)}
                placeholder="e.g., 0.35"
                className="w-full px-4 py-3 border-4 border-pink-300 rounded-xl focus:border-purple-400 focus:outline-none transition text-lg"
              />
            </div>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={calculateBungeeJump}
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 px-8 rounded-2xl font-bold text-xl hover:from-pink-600 hover:to-purple-600 transition shadow-lg transform hover:scale-105"
            >
              ✨ Calculate Magic ✨
            </button>
            <button
              onClick={resetForm}
              className="px-8 py-4 border-4 border-pink-400 rounded-2xl font-bold text-lg text-pink-600 hover:bg-pink-50 transition"
            >
              Reset 🔄
            </button>
          </div>

          {result && (
            <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-pink-100 border-4 border-pink-400 rounded-3xl p-8 animate-fade-in">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Heart className="text-pink-500 fill-pink-500" size={32} />
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                  Your Results! 🎀
                </h2>
                <Sparkles className="text-purple-500" size={32} />
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-300">
                  <div className="text-sm font-semibold text-pink-500 mb-1">✨ String Added</div>
                  <div className="text-3xl font-bold text-purple-600">{result.stringAdded} m</div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-300">
                  <div className="text-sm font-semibold text-purple-500 mb-1">💫 Bungee Stretch Distance</div>
                  <div className="text-3xl font-bold text-pink-600">{result.stretchDistance} m</div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-300">
                  <div className="text-sm font-semibold text-pink-500 mb-1">🌈 Total Energy</div>
                  <div className="text-2xl font-bold text-purple-600">{result.totalEnergy} J</div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-300">
                  <div className="text-sm font-semibold text-purple-500 mb-1">⭐ Ending Height</div>
                  <div className="text-2xl font-bold text-pink-600">{result.endingHeight} m</div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-pink-300">
                  <div className="text-sm font-semibold text-pink-500 mb-1">💖 Ending Gravitational PE</div>
                  <div className="text-2xl font-bold text-purple-600">{result.endingGPE} J</div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-lg border-2 border-purple-300">
                  <div className="text-sm font-semibold text-purple-500 mb-1">🎀 Ending Elastic PE</div>
                  <div className="text-2xl font-bold text-pink-600">{result.endingElasticPE} J</div>
                </div>
              </div>

              <div className="mt-6 bg-gradient-to-r from-yellow-100 to-pink-100 rounded-2xl p-6 border-2 border-yellow-300">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="text-yellow-500" size={24} />
                  <p className="text-lg font-bold text-gray-700">Fun Facts About Your Jump!</p>
                </div>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">🎯</span>
                    <span>Your jumper will experience a thrilling free fall before the bungee kicks in!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">⚡</span>
                    <span>The elastic energy at the bottom equals <strong>{result.endingElasticPE} J</strong> - that's the spring power!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-pink-500 font-bold">💝</span>
                    <span>Energy is perfectly conserved throughout the jump - physics is magical!</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-200 to-purple-200 px-6 py-3 rounded-full">
              <Heart className="text-pink-500 fill-pink-500" size={20} />
              <p className="text-sm font-semibold text-gray-700">Made with love, physics & AI! 💕✨🤖</p>
              <Sparkles className="text-purple-500" size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}