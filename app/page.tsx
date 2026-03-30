"use client";

import { useState } from "react";

export default function InjuryPreventionPage() {
  const [sport, setSport] = useState("");
  const [trainingVolume, setTrainingVolume] = useState("");
  const [niggles, setNiggles] = useState("");
  const [history, setHistory] = useState("");
  const [goals, setGoals] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sport, trainingVolume, niggles, history, goals }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Generation failed");
      setOutput(data.output);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold mb-2" style={{ color: "hsl(90, 70%, 50%)" }}>
            Sports Injury Prevention & Recovery Plan
          </h1>
          <p className="text-gray-400 text-lg">
            Get a personalized injury prevention program with mobility work, load management, and recovery protocols.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-10">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Primary Sport / Activity</label>
            <input
              type="text"
              required
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
              placeholder="e.g. CrossFit, long-distance running, basketball, weightlifting..."
              value={sport}
              onChange={(e) => setSport(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Weekly Training Volume</label>
            <textarea
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
              rows={2}
              placeholder="e.g. 5 days/week, 60-90 min sessions, combination of lifting and cardio..."
              value={trainingVolume}
              onChange={(e) => setTrainingVolume(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Niggles or Areas of Concern</label>
            <textarea
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
              rows={2}
              placeholder="e.g. Slight knee pain when running, tight hamstrings, lower back stiffness after heavy deadlifts..."
              value={niggles}
              onChange={(e) => setNiggles(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Injury History</label>
            <textarea
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
              rows={2}
              placeholder="e.g. Previous ACL tear 3 years ago, chronic IT band issues, no major injuries..."
              value={history}
              onChange={(e) => setHistory(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Training Goals</label>
            <textarea
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-lime-500 transition-colors"
              rows={2}
              placeholder="e.g. Run my first marathon, compete in powerlifting meet, improve overall durability..."
              value={goals}
              onChange={(e) => setGoals(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "hsl(90, 70%, 50%)" }}
          >
            {loading ? "Building Prevention Plan..." : "Generate Injury Prevention Plan"}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">
            {error}
          </div>
        )}

        {output && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Your Injury Prevention Plan</h2>
              <span className="text-xs text-gray-500">AI Generated</span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}

        <p className="mt-8 text-center text-gray-600 text-xs">
          This tool provides general guidance only. Always consult a physical therapist or sports medicine physician for persistent pain or injury.
        </p>
      </div>
    </div>
  );
}
