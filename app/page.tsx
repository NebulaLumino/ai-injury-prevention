"use client";
import { useState } from "react";

export default function InjuryPreventionPage() {
  const [sport, setSport] = useState("");
  const [injuryHistory, setInjuryHistory] = useState("");
  const [currentComplaints, setCurrentComplaints] = useState("");
  const [trainingIntensity, setTrainingIntensity] = useState("");
  const [recoveryTime, setRecoveryTime] = useState("");
  const [physicalTherapy, setPhysicalTherapy] = useState("");
  const [equipment, setEquipment] = useState("");
  const [ageCategory, setAgeCategory] = useState("");
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
        body: JSON.stringify({ sport, injuryHistory, currentComplaints, trainingIntensity, recoveryTime, physicalTherapy, equipment, ageCategory }),
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
          <h1 className="text-4xl font-bold mb-2" style={{ color: "hsl(38, 92%, 50%)" }}>
            AI Injury Prevention & Recovery Plan Generator
          </h1>
          <p className="text-gray-400 text-lg">
            Get a personalized injury prevention and rehabilitation plan with risk assessments, prehab protocols, and return-to-play criteria.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Primary Sport *</label>
              <input type="text" required value={sport} onChange={(e) => setSport(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="e.g. Basketball, marathon running, CrossFit..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Age Category</label>
              <select value={ageCategory} onChange={(e) => setAgeCategory(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                <option value="">Select age...</option>
                <option>Youth (under 13)</option>
                <option>Adolescent (13-18)</option>
                <option>Adult (18-40)</option>
                <option>Masters/40+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Injury History</label>
            <textarea value={injuryHistory} onChange={(e) => setInjuryHistory(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              rows={2} placeholder="e.g. ACL reconstruction 2 years ago, chronic ankle instability, no major injuries..." />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Current Complaints / Niggles</label>
            <textarea value={currentComplaints} onChange={(e) => setCurrentComplaints(e.target.value)}
              className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
              rows={2} placeholder="e.g. Knee aches after running, shoulder tightness, lower back stiffness..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Training Intensity</label>
              <select value={trainingIntensity} onChange={(e) => setTrainingIntensity(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                <option value="">Select intensity...</option>
                <option>Light (1-2 sessions/week)</option>
                <option>Moderate (3-4 sessions/week)</option>
                <option>Intense (5-6 sessions/week)</option>
                <option>Very Intense (daily/multiple per day)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Recovery Time Available</label>
              <input type="text" value={recoveryTime} onChange={(e) => setRecoveryTime(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="e.g. 1 rest day/week, full weekend off..." />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Access to Physical Therapy</label>
              <select value={physicalTherapy} onChange={(e) => setPhysicalTherapy(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 transition-colors">
                <option value="">Select access...</option>
                <option>Regular PT (2+ sessions/week)</option>
                <option>Occasional PT (1-2x/month)</option>
                <option>Limited access (on-demand only)</option>
                <option>No current PT access</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Equipment Available</label>
              <input type="text" value={equipment} onChange={(e) => setEquipment(e.target.value)}
                className="w-full bg-gray-800/60 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="e.g. Resistance bands, foam roller, full gym..." />
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-4 rounded-xl font-semibold text-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: "hsl(38, 92%, 50%)" }}>
            {loading ? "Generating Prevention Plan..." : "Generate Injury Prevention Plan"}
          </button>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-xl text-red-300 text-sm">{error}</div>
        )}

        {output && (
          <div className="bg-gray-800/40 border border-gray-700 rounded-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-200">Your Prevention & Recovery Plan</h2>
              <span className="text-xs text-gray-500">AI Generated</span>
            </div>
            <div className="prose prose-invert prose-sm max-w-none text-gray-300 whitespace-pre-wrap">{output}</div>
          </div>
        )}

        <p className="mt-8 text-center text-gray-600 text-xs">
          This tool provides general guidance only. Always consult a physical therapist or sports medicine physician for persistent pain or injury.
        </p>
      </div>
    </div>
  );
}
