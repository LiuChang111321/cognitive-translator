export function CognitiveAbout() {
  return (
    <section className="w-full max-w-md mx-auto text-center space-y-3">
      <div className="text-[10px] text-muted-foreground/40 tracking-widest font-medium uppercase">
        关于这个工具
      </div>
      <p className="text-xs text-muted-foreground/60 leading-relaxed">
        这是一个基于 MBTI 认知风格模型的沟通翻译器。
        它帮你理解同一句话在不同人格耳中的不同含义。
      </p>
      <p className="text-xs text-muted-foreground/40 leading-relaxed">
        不诊断，不判断，仅供娱乐参考。
        每个人的复杂性远不止四个字母。
      </p>
    </section>
  );
}
