"use client";

import { personalityObservations } from "@/lib/content/personality-observations";

// Map type to label color
const TYPE_PALETTE: Record<string, string> = {
  INTJ: "bg-purple-100 text-purple-600",
  INTP: "bg-indigo-100 text-indigo-600",
  ENTJ: "bg-red-100 text-red-500",
  ENTP: "bg-orange-100 text-orange-600",
  INFJ: "bg-violet-100 text-violet-600",
  INFP: "bg-pink-100 text-pink-600",
  ENFJ: "bg-rose-100 text-rose-600",
  ENFP: "bg-sky-100 text-sky-600",
  ISTJ: "bg-blue-100 text-blue-600",
  ISFJ: "bg-cyan-100 text-cyan-600",
  ESTJ: "bg-emerald-100 text-emerald-600",
  ESFJ: "bg-green-100 text-green-600",
  ISTP: "bg-teal-100 text-teal-600",
  ISFP: "bg-lime-100 text-lime-600",
  ESTP: "bg-yellow-100 text-yellow-700",
  ESFP: "bg-amber-100 text-amber-700",
};

export function PersonalityObservations() {
  return (
    <section className="w-full space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-sm font-semibold text-foreground/80 tracking-tight">
          人格关系观察
        </h2>
        <p className="text-[10px] text-muted-foreground/40">
          不是真理，但可能你也会这样想
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {personalityObservations.map((obs) => (
          <div
            key={obs.id}
            className="rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm"
          >
            <div className="flex items-start gap-2.5">
              {obs.type && (
                <span
                  className={`shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    TYPE_PALETTE[obs.type] ?? "bg-gray-100 text-gray-500"
                  }`}
                >
                  {obs.type}
                </span>
              )}
              <p className="text-xs text-foreground/70 leading-relaxed">
                {obs.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
