"use client";

export function CognitiveHero() {
  return (
    <section className="text-center space-y-2 pt-6 pb-1">
      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground/40 mb-2">
        <span>🧠</span>
        <span className="tracking-widest font-medium">MBTI 沟通翻译器</span>
        <span>🌟</span>
      </div>
      <h1 className="text-2xl sm:text-[28px] font-bold text-foreground leading-[1.15] tracking-tight">
        有些吵架，是
        <span className="text-primary">翻译失败</span>
      </h1>
      <p className="text-xs text-muted-foreground/60 max-w-xs mx-auto leading-relaxed">
        同一句话，不同人格听到的是不同意思。
      </p>
    </section>
  );
}
