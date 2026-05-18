export function Hero() {
  return (
    <section className="relative text-center py-16 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-sky-400/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-violet-400/5 blur-3xl" />
      </div>

      <div className="relative space-y-6">
        {/* Version badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border bg-white/80 text-xs font-medium text-muted-foreground shadow-sm">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
          第二版 · 16 种 MBTI 任意互译
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text">
          认知翻译器
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          把不同认知风格之间的
          <span className="text-foreground font-medium">&ldquo;信息编码差异&rdquo;</span>
          翻译成双方都能理解的语言。
        </p>
      </div>
    </section>
  );
}
