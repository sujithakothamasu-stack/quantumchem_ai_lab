import React, { useState } from "react";
import { askAI } from "./ai";
import MoleculeViewer from "./MoleculeViewer";

import {
  Atom,
  Moon,
  Sun,
  Brain,
  Sparkles,
  ArrowRight,
  Bot,
  Boxes,
  Beaker,
  BookOpenCheck,
  LogOut,
  Settings,
  Key,
} from "lucide-react";

export default function App({ user, onLogout }) {
  const [darkMode, setDarkMode] = useState(false);

  // AI
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("openrouter_api_key") || "");
  const [showSettings, setShowSettings] = useState(false);

  const handleSaveApiKey = (val) => {
    setApiKey(val);
    localStorage.setItem("openrouter_api_key", val);
  };

  // Molecules
  const [moleculeName, setMoleculeName] = useState("water");

  // Virtual Lab
  const [experimentResult, setExperimentResult] =
    useState("");

  // Quiz
  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [score, setScore] = useState(0);

  const [showResult, setShowResult] = useState(false);

  const [answerStatus, setAnswerStatus] =
    useState("");

  const quizQuestions = [
    {
      question:
        "What is the chemical formula of water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: "H2O",
    },

    {
      question: "Which gas do plants absorb?",
      options: [
        "Oxygen",
        "Nitrogen",
        "Carbon Dioxide",
        "Hydrogen",
      ],
      correct: "Carbon Dioxide",
    },

    {
      question: "What is the pH of pure water?",
      options: ["5", "7", "10", "14"],
      correct: "7",
    },

    {
      question: "Which element has symbol Na?",
      options: [
        "Nitrogen",
        "Sodium",
        "Neon",
        "Nickel",
      ],
      correct: "Sodium",
    },
  ];

  const modules = [
    {
      title: "AI Tutor",
      icon: (
        <Bot className="w-10 h-10 text-cyan-400" />
      ),
      desc: "Ask chemistry doubts with smart AI explanations.",
    },

    {
      title: "3D Molecules",
      icon: (
        <Boxes className="w-10 h-10 text-purple-400" />
      ),
      desc: "Interactive molecule visualization.",
    },

    {
      title: "Experiments",
      icon: (
        <Beaker className="w-10 h-10 text-pink-400" />
      ),
      desc: "Virtual chemistry lab simulations.",
    },

    {
      title: "Quiz Arena",
      icon: (
        <BookOpenCheck className="w-10 h-10 text-yellow-400" />
      ),
      desc: "Practice chemistry quizzes.",
    },
  ];

  const handleAskAI = async () => {
    if (!question) return;

    setLoading(true);

    const res = await askAI(question, apiKey);

    setAnswer(res);

    setLoading(false);
  };

  const handleAnswer = (option) => {
    const correct =
      quizQuestions[currentQuestion].correct;

    if (option === correct) {
      setScore((s) => s + 1);

      setAnswerStatus("Correct ✅");
    } else {
      setAnswerStatus("Wrong ❌");
    }

    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setShowResult(false);

    if (
      currentQuestion + 1 <
      quizQuestions.length
    ) {
      setCurrentQuestion((q) => q + 1);
    } else {
      alert(
        `Quiz Finished! Score: ${score}/${quizQuestions.length}`
      );
    }
  };

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-[#060816] text-white"
          : "bg-gradient-to-br from-cyan-50 via-white to-blue-50 text-slate-900"
      }`}
    >
      {/* NAVBAR */}
      <nav
        className={`border-b px-6 py-4 flex justify-between items-center ${
          darkMode
            ? "bg-slate-900 border-slate-700"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="flex items-center gap-3">
          <Atom className="text-cyan-400" />

          <h1 className="text-3xl font-bold">
            QuantumChem
          </h1>
        </div>

        <div className="flex items-center gap-6">
          {user && (
            <div
              className={`flex items-center gap-3 px-4 py-2 rounded-full border ${
                darkMode
                  ? "bg-cyan-500 bg-opacity-20 border-cyan-400"
                  : "bg-cyan-50 border-cyan-400"
              }`}
            >
              <span className="text-sm font-semibold">
                Welcome, {user.name}!
              </span>
              <button
                onClick={onLogout}
                className={`p-2 rounded-full transition hover:bg-opacity-50 ${
                  darkMode
                    ? "hover:bg-cyan-600"
                    : "hover:bg-cyan-200"
                }`}
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          <button
            onClick={() =>
              setDarkMode(!darkMode)
            }
            className="p-3 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition"
          >
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full">
          <Sparkles size={18} />

          AI Chemistry Universe
        </div>

        <h1 className="text-6xl font-bold mt-6">
          QuantumChem AI Lab
        </h1>

        <p className="mt-6 text-lg">
          Learn chemistry using AI, 3D
          molecules, experiments and quizzes.
        </p>

        <button className="mt-8 px-6 py-4 rounded-2xl bg-cyan-500 text-white flex gap-2">
          ENTER LAB <ArrowRight />
        </button>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 pb-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {modules.map((m, i) => (
          <div
            key={i}
            className={`rounded-3xl p-6 shadow-xl ${
              darkMode
                ? "bg-[#111827]"
                : "bg-white"
            }`}
          >
            {m.icon}

            <h3 className="text-xl font-bold mt-4">
              {m.title}
            </h3>

            <p className="mt-3">{m.desc}</p>
          </div>
        ))}
      </section>

      {/* AI TUTOR */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className={`rounded-3xl p-8 shadow-xl border transition-all ${
          darkMode 
            ? "bg-[#111827] border-slate-800" 
            : "bg-white border-slate-100"
        }`}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4 items-center">
              <Brain className="text-cyan-400 w-10 h-10" />
              <h2 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                AI Tutor
              </h2>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl border transition-all ${
                showSettings 
                  ? "bg-cyan-500/10 border-cyan-400 text-cyan-400" 
                  : darkMode 
                    ? "bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700" 
                    : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
              }`}
              title="Configure API Key"
            >
              <Settings size={20} />
            </button>
          </div>

          {showSettings && (
            <div className={`mb-6 p-4 rounded-2xl border transition-all ${
              darkMode 
                ? "bg-slate-900/50 border-slate-800 text-slate-350" 
                : "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              <label className="block text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Key size={16} className="text-cyan-400" />
                Configure OpenRouter API Key
              </label>
              <p className={`text-xs mb-3 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
                If provided, we query GPT-3.5 via OpenRouter. Otherwise, the tutor operates in smart local chemistry offline fallback mode.
              </p>
              <div className="flex gap-3">
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => handleSaveApiKey(e.target.value)}
                  placeholder="sk-or-v1-..."
                  className={`flex-1 px-4 py-2 border rounded-xl text-sm focus:outline-none focus:border-cyan-400 ${
                    darkMode 
                      ? "bg-slate-955 border-slate-800 text-white" 
                      : "bg-white border-slate-200 text-slate-800"
                  }`}
                />
                {apiKey && (
                  <button
                    onClick={() => handleSaveApiKey("")}
                    className="px-4 py-2 bg-red-500 hover:bg-red-650 text-white rounded-xl text-sm font-bold transition"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4">
            <input
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
              className={`flex-1 border rounded-xl px-4 py-4 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-white placeholder-slate-500"
                  : "bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
              placeholder="Ask chemistry question..."
            />

            <button
              onClick={handleAskAI}
              className="px-6 py-4 rounded-xl bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition"
            >
              {loading
                ? "Thinking..."
                : "Ask AI"}
            </button>
          </div>

          {answer && (
            <div className={`mt-6 p-5 rounded-2xl leading-relaxed whitespace-pre-line border ${
              darkMode 
                ? "bg-slate-900 border-slate-800 text-slate-200" 
                : "bg-slate-50 border-slate-100 text-slate-800"
            }`}>
              {answer}
            </div>
          )}
        </div>
      </section>

      {/* MOLECULE VIEWER */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold text-purple-500 mb-6">
            3D Molecule Viewer
          </h2>

          <input
            value={moleculeName}
            onChange={(e) =>
              setMoleculeName(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-4 mb-6"
            placeholder="Search molecule..."
          />

          <MoleculeViewer molecule={moleculeName} />
        </div>
      </section>

      {/* VIRTUAL LAB */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="bg-white rounded-3xl p-8 shadow-xl">
          <h2 className="text-4xl font-bold text-pink-500 mb-6">
            Virtual Chemistry Lab
          </h2>

          <div className="flex flex-wrap justify-center gap-10 mb-10">
            {/* ACID */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-48 rounded-b-[40px] border-4 border-gray-300 relative overflow-hidden bg-pink-100">
                <div className="absolute bottom-0 w-full h-32 bg-pink-500 animate-pulse"></div>
              </div>

              <p className="mt-4 font-bold">
                Acid
              </p>
            </div>

            {/* BASE */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-48 rounded-b-[40px] border-4 border-gray-300 relative overflow-hidden bg-blue-100">
                <div className="absolute bottom-0 w-full h-32 bg-blue-500 animate-pulse"></div>
              </div>

              <p className="mt-4 font-bold">
                Base
              </p>
            </div>

            {/* REACTION */}
            <div className="flex flex-col items-center">
              <div className="w-24 h-56 rounded-full border-4 border-gray-300 relative overflow-hidden bg-yellow-100">
                {experimentResult ===
                  "reaction" && (
                  <>
                    <div className="absolute bottom-0 w-full h-40 bg-yellow-400 animate-pulse"></div>

                    <div className="absolute bottom-10 left-5 w-4 h-4 bg-white rounded-full animate-bounce"></div>

                    <div className="absolute bottom-20 right-6 w-5 h-5 bg-white rounded-full animate-bounce"></div>
                  </>
                )}
              </div>

              <p className="mt-4 font-bold">
                Reaction Chamber
              </p>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <button
              onClick={() =>
                setExperimentResult(
                  "reaction"
                )
              }
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold"
            >
              Mix Chemicals 🧪
            </button>

            <button
              onClick={() =>
                setExperimentResult("")
              }
              className="px-8 py-4 rounded-2xl bg-gray-700 text-white font-bold"
            >
              Reset
            </button>
          </div>

          {experimentResult ===
            "reaction" && (
            <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-3xl p-6">
              <h3 className="text-2xl font-bold text-yellow-700 mb-4">
                Reaction Analysis
              </h3>

              <p className="text-black text-lg">
                Acid and Base reacted
                producing a neutralization
                reaction with bubbling
                effects.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* QUIZ */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="rounded-3xl p-8 shadow-xl bg-white dark:bg-[#111827]">
          <h2 className="text-3xl font-bold text-cyan-500 mb-4">
            Quiz Arena
          </h2>

          <div className="mb-4">
            Score: {score}
          </div>

          <h3 className="text-xl font-bold mb-6">
            {
              quizQuestions[currentQuestion]
                .question
            }
          </h3>

          <div className="grid gap-4">
            {quizQuestions[
              currentQuestion
            ].options.map((opt, i) => (
              <button
                key={i}
                disabled={showResult}
                onClick={() =>
                  handleAnswer(opt)
                }
                className="border p-4 rounded-xl hover:bg-cyan-50 text-black"
              >
                {opt}
              </button>
            ))}
          </div>

          {showResult && (
            <div className="mt-6">
              <h3 className="text-xl font-bold">
                {answerStatus}
              </h3>

              <button
                onClick={
                  handleNextQuestion
                }
                className="mt-4 px-6 py-3 bg-cyan-500 text-white rounded-xl"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}