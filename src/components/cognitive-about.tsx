export function CognitiveAbout() {
  return (
    <section className="w-full max-w-lg mx-auto space-y-4">
      <div className="text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium mb-3">
          About this project
        </p>
        <h2 className="text-sm font-medium text-white/50 leading-relaxed">
          This is not a personality test.
          <br />
          It is a{" "}
          <span className="text-white/70">cognitive translation layer</span>.
        </h2>
      </div>

      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 space-y-3">
        <p className="text-xs text-white/40 leading-relaxed">
          Every person has a unique way of processing information — what they notice first,
          what they trust, what they need to hear. These aren&apos;t flaws. They&apos;re
          different cognitive protocols.
        </p>
        <p className="text-xs text-white/40 leading-relaxed">
          Most conflicts don&apos;t come from bad intentions. They come from mismatched
          attention systems.
        </p>
        <p className="text-xs text-white/40 leading-relaxed">
          This tool helps you see what someone probably meant — beyond what they said.
        </p>
        <div className="pt-2 text-[10px] text-white/15 text-center">
          MBTI is used as a communication style entry point, not a personality diagnosis.
        </div>
      </div>
    </section>
  );
}
