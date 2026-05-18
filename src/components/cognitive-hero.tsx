"use client";

export function CognitiveHero() {
  return (
    <section className="text-center space-y-3 pt-8 pb-2">
      {/* badge */}
      <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground/40 mb-3">
        <span>🧠</span>
        <span className="tracking-widest font-medium">MBTI 沟通翻译器</span>
        <span>🌟</span>
      </div>

      {/* tagline */}
      <h1 className="text-[26px] sm:text-3xl font-bold text-foreground leading-[1.2] tracking-tight">
        有些吵架，
        <br />
        本质上只是
        <span className="text-primary">翻译失败</span>
      </h1>

      <p className="text-sm text-muted-foreground/70 max-w-xs mx-auto leading-relaxed">
        同一句话，不同人格听到的是完全不同的意思。
        <br />
        不是ta故意气你，是ta的大脑语言系统不一样。
      </p>
    </section>
  );
}
