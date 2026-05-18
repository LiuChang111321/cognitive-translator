"use client";

import { MBTI_EMOJI } from "@/lib/constants";
import type { MbtiCode } from "@/lib/mbti/types";
import { viralScenes } from "@/lib/content/viral-scenes";

export function ViralScenes() {
  return (
    <section className="w-full space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-sm font-semibold text-foreground/80 tracking-tight">
          人格翻译名场面
        </h2>
        <p className="text-[10px] text-muted-foreground/40">
          同一个世界，不同的操作系统
        </p>
      </div>

      {/* Horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 pb-2">
        {viralScenes.map((scene) => (
          <div
            key={scene.id}
            className="snap-center shrink-0 w-[270px] sm:w-[300px] rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            {/* Header: personality combo */}
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-xs font-semibold text-foreground/70">
                {MBTI_EMOJI[scene.sender as MbtiCode]} {scene.sender}
              </span>
              <span className="text-[10px] text-muted-foreground/30">→</span>
              <span className="text-xs font-semibold text-foreground/70">
                {MBTI_EMOJI[scene.receiver as MbtiCode]} {scene.receiver}
              </span>
            </div>

            {/* Original quote */}
            <div className="mb-3 pl-3 border-l-2 border-gray-200">
              <p className="text-xs text-foreground/70 leading-relaxed">
                &ldquo;{scene.original}&rdquo;
              </p>
            </div>

            {/* Heard as */}
            <div className="flex items-start gap-2 mb-1.5">
              <span className="text-xs mt-0.5">😅</span>
              <div>
                <span className="text-[9px] text-rose-400/70 font-medium uppercase tracking-wide">
                  对方听到
                </span>
                <p className="text-xs text-rose-500/80 leading-relaxed mt-0.5">
                  {scene.heardAs}
                </p>
              </div>
            </div>

            {/* Actually means */}
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xs mt-0.5">💛</span>
              <div>
                <span className="text-[9px] text-amber-500/70 font-medium uppercase tracking-wide">
                  真实意思
                </span>
                <p className="text-xs text-amber-600/80 leading-relaxed mt-0.5">
                  {scene.actuallyMeans}
                </p>
              </div>
            </div>

            {/* Roast */}
            <div className="pt-2.5 border-t border-gray-100">
              <p className="text-[11px] text-muted-foreground/50 italic text-center leading-relaxed">
                {scene.roast}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* scroll hint */}
      <div className="flex justify-center gap-1">
        <span className="text-[10px] text-muted-foreground/25 animate-pulse">
          ← 左右滑动 →
        </span>
      </div>
    </section>
  );
}
