import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";

const G = {
  bg: "#080808", border: "rgba(255,255,255,0.07)",
  green: "#4ade80", teal: "#2dd4bf",
  purple: "#a78bfa", yellow: "#fbbf24",
  red: "#f87171", orange: "#fb923c", blue: "#60a5fa",
  muted: "#6b7280", text: "#f1f5f9", sub: "#94a3b8",
};
const P = [G.green, G.teal, G.purple, G.yellow, G.red, G.orange, G.blue, "#34d399", "#e879f9", "#38bdf8"];

const D = {
  idade:        [{ l: "25–27", v: 31 }, { l: "21–24", v: 29 }, { l: "28–30", v: 26 }, { l: "14–17", v: 12 }, { l: "18–20", v: 11 }],
  genero:       [{ l: "Feminino", v: 64 }, { l: "Masculino", v: 43 }, { l: "Prefiro não informar", v: 1 }, { l: "Outro", v: 1 }],
  estado:       [{ l: "São Paulo (SP)", v: 81 }, { l: "Piauí (PI)", v: 12 }, { l: "Pernambuco (PE)", v: 7 }, { l: "Outros estados", v: 9 }],
  escolaridade: [{ l: "Faculdade em andamento", v: 33 }, { l: "Ensino médio", v: 32 }, { l: "Superior completo", v: 21 }, { l: "Ensino técnico", v: 12 }, { l: "Pós-graduação", v: 11 }],
  situacao:     [{ l: "Apenas trabalho", v: 45 }, { l: "Trabalho e estudo", v: 36 }, { l: "Apenas estuda", v: 23 }, { l: "Desempregado(a)", v: 5 }],
  renda:        [{ l: "R$2.001–R$4.000", v: 36 }, { l: "Sem renda própria", v: 24 }, { l: "R$1.001–R$2.000", v: 19 }, { l: "R$4.001–R$7.000", v: 16 }, { l: "Acima de R$7.000", v: 11 }, { l: "Até R$1.000", v: 3 }],
  controla:     [{ l: "Às vezes", v: 60 }, { l: "Sim, rigorosamente", v: 30 }, { l: "Não controlo", v: 19 }],
  comoControla: [{ l: "Mentalmente", v: 52 }, { l: "Anotações", v: 47 }, { l: "Planilha", v: 24 }, { l: "Não controlo", v: 18 }, { l: "App financeiro", v: 8 }],
  guarda:       [{ l: "Às vezes", v: 43 }, { l: "Raramente", v: 32 }, { l: "Sempre", v: 22 }, { l: "Nunca", v: 12 }],
  reserva:      [{ l: "Não tenho", v: 45, c: G.red }, { l: "Tenho", v: 43, c: G.green }, { l: "Estou construindo", v: 21, c: G.yellow }],
  desafio:      [{ l: "Controlar gastos", v: 53, m: "🥇" }, { l: "Organização financeira", v: 45, m: "🥈" }, { l: "Ganhar mais", v: 35, m: "🥉" }, { l: "Conseguir investir", v: 34, m: "🏅" }, { l: "Educação financeira", v: 34, m: "🎯" }, { l: "Dívidas", v: 25, m: "📌" }],
  cartao:       [{ l: "Sim", v: 87 }, { l: "Não", v: 22 }],
  parcela:      [{ l: "Às vezes", v: 49 }, { l: "Frequentemente", v: 34 }, { l: "Nunca", v: 17 }, { l: "Sempre", v: 9 }],
  atrasou:      [{ l: "Não atrasou", v: 57, c: G.green }, { l: "Já atrasou", v: 52, c: G.red }],
  categorias:   [{ l: "Alimentação", v: 78 }, { l: "Lazer", v: 53 }, { l: "Roupas", v: 45 }, { l: "Delivery", v: 43 }, { l: "Transporte", v: 31 }, { l: "Estudos", v: 20 }, { l: "Streaming", v: 18 }, { l: "Jogos", v: 14 }, { l: "Tecnologia", v: 14 }],
  impulso:      [{ l: "1", v: 18 }, { l: "2", v: 23 }, { l: "3", v: 32 }, { l: "4", v: 22 }, { l: "5", v: 14 }],
  tipoBanco:    [{ l: "Banco digital", v: 66 }, { l: "Uso ambos", v: 33 }, { l: "Banco tradicional", v: 10 }],
  bancos:       [{ l: "Nubank", v: 68, m: "🥇" }, { l: "Itaú Unibanco", v: 35, m: "🥈" }, { l: "Inter", v: 23, m: "🥉" }, { l: "Santander", v: 14, m: "4°" }, { l: "Bradesco", v: 13, m: "5°" }, { l: "Banco do Brasil", v: 8, m: "6°" }, { l: "C6 Bank", v: 5, m: "7°" }, { l: "PicPay", v: 5, m: "8°" }, { l: "Mercado Pago", v: 5, m: "9°" }],
  influencia:   [{ l: "Facilidade do app", v: 85 }, { l: "Cartão de crédito", v: 41 }, { l: "Marca/confiança", v: 40 }, { l: "Rendimento da conta", v: 35 }, { l: "Investimentos", v: 21 }, { l: "Indicação de amigos", v: 14 }, { l: "Atendimento", v: 11 }, { l: "Taxas", v: 11 }, { l: "Cashback", v: 5 }],
  confiaBanco:  [{ l: "1", v: 6 }, { l: "2", v: 7 }, { l: "3", v: 32 }, { l: "4", v: 30 }, { l: "5", v: 34 }],
  investe:      [{ l: "Não investe", v: 47, c: "#444" }, { l: "Quer começar", v: 32, c: G.teal }, { l: "Investe", v: 30, c: G.green }],
  ondeInveste:  [{ l: "Não conheço invest.", v: 36 }, { l: "CDB", v: 35 }, { l: "Poupança", v: 25 }, { l: "Fundos imobiliários", v: 21 }, { l: "Tesouro Direto", v: 20 }, { l: "Ações", v: 19 }, { l: "Criptomoedas", v: 15 }],
  nivelInvest:  [{ l: "1 – Nenhum", v: 31 }, { l: "2", v: 41 }, { l: "3 – Básico", v: 29 }, { l: "4", v: 7 }, { l: "5 – Avançado", v: 1 }],
  impedeInvestir:[{ l: "Falta de conhecimento", v: 62 }, { l: "Falta de dinheiro", v: 56 }, { l: "Não sei por onde começar", v: 40 }, { l: "Medo de perder dinheiro", v: 24 }, { l: "Não tenho interesse", v: 4 }],
  aprende:      [{ l: "YouTube", v: 49 }, { l: "Nunca estudei", v: 35 }, { l: "Amigos/família", v: 33 }, { l: "TikTok", v: 26 }, { l: "Instagram", v: 19 }, { l: "Cursos", v: 16 }, { l: "Faculdade", v: 4 }],
};

function useReveal(t = 0.15) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold: t });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, on];
}

function AnimNum({ target, suffix = "", duration = 1600, trigger }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = null;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [trigger, target]);
  return <>{val}{suffix}</>;
}

function ProgressBar() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      const s = el.scrollTop || document.body.scrollTop;
      const t = el.scrollHeight - el.clientHeight;
      setP(t > 0 ? s / t * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "rgba(255,255,255,0.05)", zIndex: 100 }}>
      <div style={{ height: "100%", width: `${p}%`, background: `linear-gradient(90deg,${G.teal},${G.green})`, transition: "width .1s linear", boxShadow: `0 0 10px ${G.green}` }} />
    </div>
  );
}

function Particles() {
  const pts = Array.from({ length: 14 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, s: Math.random() * 3 + 1, d: Math.random() * 8 + 5, dl: Math.random() * 4 }));
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {pts.map(p => <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, borderRadius: "50%", background: [G.green, G.teal, G.purple][p.id % 3], opacity: .18, animation: `floatP ${p.d}s ease-in-out ${p.dl}s infinite alternate` }} />)}
    </div>
  );
}

function Glow({ color = G.green, size = 500, opacity = .06 }) {
  return <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle,${color} 0%,transparent 70%)`, opacity, pointerEvents: "none" }} />;
}

const CSS = `
  @keyframes floatP { from{transform:translateY(0) scale(1);opacity:.12} to{transform:translateY(-26px) scale(1.3);opacity:.28} }
  @keyframes pulseRing { 0%{transform:scale(.8);opacity:.7} 100%{transform:scale(1.5);opacity:0} }
  @keyframes scrollBounce { from{transform:translateY(0)} to{transform:translateY(8px)} }
  html,body{margin:0;padding:0}
  html{scroll-behavior:smooth}
  *{box-sizing:border-box}
`;

function Screen({ children, id, bg = G.bg, glow }) {
  return (
    <section id={id} style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px", position: "relative", overflow: "hidden", background: bg, textAlign: "center" }}>
      <style>{CSS}</style>
      {glow && <Glow color={glow} />}
      {children}
    </section>
  );
}

function Label({ color = G.teal, children }) {
  return <div style={{ color, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>{children}</div>;
}

function H({ children, size = "clamp(22px,4vw,36px)" }) {
  return <h2 style={{ fontSize: size, fontWeight: 800, color: G.text, margin: "0 0 16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>{children}</h2>;
}

function Phrase({ children }) {
  return <p style={{ fontSize: "clamp(17px,2.5vw,22px)", color: G.sub, margin: "0 0 20px", lineHeight: 1.65, maxWidth: 600, marginLeft: "auto", marginRight: "auto" }}>{children}</p>;
}

function Insight({ color = G.teal, children }) {
  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "18px 24px", borderRadius: 14, background: `${color}0d`, border: `1px solid ${color}25` }}>
      <p style={{ fontSize: "clamp(14px,2vw,17px)", color: G.sub, margin: 0, lineHeight: 1.7, fontStyle: "italic" }}>{children}</p>
    </div>
  );
}

function BigNum({ target, suffix = "%", color, trigger }) {
  return (
    <div style={{ fontSize: "clamp(80px,16vw,160px)", fontWeight: 900, lineHeight: .9, letterSpacing: "-0.05em", color: color || G.green, marginBottom: 12, textShadow: `0 0 60px ${color || G.green}35` }}>
      <AnimNum target={target} suffix={suffix} trigger={trigger} />
    </div>
  );
}

function HBars({ data, animate, maxOverride }) {
  const max = maxOverride || Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      {data.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ color: G.sub, fontSize: 14 }}>{d.l}</span>
            <span style={{ color: P[i % P.length], fontWeight: 700, fontSize: 14 }}>{d.v}</span>
          </div>
          <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: 4, background: d.c || P[i % P.length], width: animate ? `${(d.v / max) * 100}%` : "0%", transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${i * .08}s`, boxShadow: `0 0 8px ${P[i % P.length]}50` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OpCards({ data, animate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 460, margin: "0 auto" }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "17px 22px", borderRadius: 14, background: "rgba(255,255,255,0.03)", border: `1px solid ${(d.c || P[i % P.length])}22`, opacity: animate ? 1 : 0, transform: animate ? "none" : "translateX(-20px)", transition: `all .55s cubic-bezier(.16,1,.3,1) ${i * .1}s` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.c || P[i % P.length], boxShadow: `0 0 8px ${d.c || P[i % P.length]}` }} />
            <span style={{ color: G.sub, fontSize: 15 }}>{d.l}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: d.c || P[i % P.length], fontWeight: 800, fontSize: 24 }}>{d.v}</div>
            <div style={{ color: G.muted, fontSize: 11 }}>{Math.round(d.v / 109 * 100)}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScaleChart({ data, animate }) {
  const max = Math.max(...data.map(d => d.v));
  const sc = [G.red, G.orange, G.yellow, G.teal, G.green];
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-end", justifyContent: "center", height: 180, maxWidth: 400, margin: "0 auto", width: "100%" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ color: sc[i], fontWeight: 700, fontSize: 16 }}>{d.v}</div>
          <div style={{ width: "100%", borderRadius: 6, background: sc[i], height: animate ? `${(d.v / max) * 140}px` : "0px", transition: `height .9s cubic-bezier(.4,0,.2,1) ${i * .1}s`, boxShadow: `0 0 12px ${sc[i]}50` }} />
          <div style={{ color: G.muted, fontSize: 11 }}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

function Ranking({ data, animate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 520, margin: "0 auto", width: "100%" }}>
      {data.map((d, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 14, background: i === 0 ? `${G.yellow}0e` : "rgba(255,255,255,0.03)", border: `1px solid ${i === 0 ? G.yellow + "30" : G.border}`, opacity: animate ? 1 : 0, transform: animate ? "none" : "translateX(-28px)", transition: `all .55s cubic-bezier(.16,1,.3,1) ${i * .1}s` }}>
          <span style={{ fontSize: i < 3 ? 22 : 15, minWidth: 34 }}>{d.m}</span>
          <span style={{ color: G.text, fontSize: 15, flex: 1, textAlign: "left", fontWeight: i === 0 ? 700 : 400 }}>{d.l}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 56, height: 5, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
              <div style={{ width: animate ? `${(d.v / data[0].v) * 100}%` : "0%", height: "100%", borderRadius: 3, background: P[i % P.length], transition: `width 1s ease ${.3 + i * .08}s` }} />
            </div>
            <span style={{ color: P[i % P.length], fontWeight: 700, fontSize: 18, minWidth: 28 }}>{d.v}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Hero() {
  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => setShow(true), 200);
    let n = 0;
    const t = setInterval(() => { n += 2; if (n >= 110) { setCount(110); clearInterval(t); } else setCount(n); }, 18);
    return () => clearInterval(t);
  }, []);
  return (
    <Screen glow={G.green}>
      <Particles />
      <div style={{ opacity: show ? 1 : 0, transform: show ? "none" : "translateY(40px)", transition: "all .9s cubic-bezier(.16,1,.3,1)", maxWidth: 780, zIndex: 1 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 18px", borderRadius: 999, border: `1px solid rgba(74,222,128,.35)`, background: "rgba(74,222,128,.07)", marginBottom: 40 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, boxShadow: `0 0 10px ${G.green}`, animation: "pulseRing 1.5s ease-out infinite" }} />
          <span style={{ color: G.teal, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600 }}>{count} respostas coletadas</span>
        </div>
        <h1 style={{ fontSize: "clamp(30px,6vw,72px)", fontWeight: 900, color: G.text, margin: "0 0 22px", lineHeight: 1.05, letterSpacing: "-0.035em" }}>
          Raio-X Financeiro<br />
          <span style={{ background: `linear-gradient(135deg,${G.green},${G.teal},${G.purple})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            da Geração Z Brasileira
          </span>
        </h1>
        <p style={{ color: G.sub, fontSize: "clamp(15px,2.2vw,20px)", margin: "0 0 56px", lineHeight: 1.7, maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}>
          Como 110 jovens brasileiros lidam com dinheiro,<br />investimentos e bancos digitais.
        </p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span style={{ color: G.muted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>scroll para descobrir</span>
          <div style={{ width: 26, height: 42, borderRadius: 13, border: "1px solid rgba(255,255,255,.14)", display: "flex", justifyContent: "center", paddingTop: 7 }}>
            <div style={{ width: 4, height: 9, borderRadius: 2, background: G.green, animation: "scrollBounce 1.4s ease-in-out infinite alternate" }} />
          </div>
        </div>
      </div>
    </Screen>
  );
}

function S_Perfil() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#08080e" glow={G.purple}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%", zIndex: 1 }}>
        <Label color={G.purple}>Quem respondeu</Label>
        <H size="clamp(26px,5vw,44px)">Perfil dos participantes</H>
        <Phrase>110 jovens brasileiros compartilharam sua realidade financeira.</Phrase>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 16, marginTop: 32, textAlign: "left" }}>
          {[
            { title: "Faixa etária", data: D.idade, c: G.teal },
            { title: "Gênero", data: D.genero, c: G.purple },
            { title: "Estado", data: D.estado, c: G.blue },
            { title: "Escolaridade", data: D.escolaridade, c: G.green },
            { title: "Situação atual", data: D.situacao, c: G.yellow },
            { title: "Faixa de renda mensal", data: D.renda, c: G.orange },
          ].map((c, ci) => (
            <div key={ci} style={{ padding: 22, borderRadius: 16, background: "rgba(255,255,255,.03)", border: `1px solid ${G.border}` }}>
              <div style={{ color: c.c, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18, fontWeight: 600 }}>{c.title}</div>
              <HBars data={c.data} animate={on} />
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function S_Controle() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#080c08" glow={G.teal}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.teal}>Controle financeiro</Label>
        <BigNum target={72} color={G.teal} trigger={on} />
        <H>não controlam os gastos de forma consistente</H>
        <Phrase>A maior parte dos participantes não possui uma rotina consistente de controle financeiro.</Phrase>
        <Insight color={G.teal}>Esse foi um dos dados que mais me chamou atenção. Se não existe clareza sobre para onde o dinheiro está indo, fica muito mais difícil construir hábitos financeiros saudáveis.</Insight>
        <div style={{ marginTop: 40 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Como declararam controlar</div>
          <div style={{ maxWidth: 480, margin: "0 auto" }}>
            {[
              { l: "Às vezes", v: 60, pct: 55, c: G.teal },
              { l: "Sim, rigorosamente", v: 30, pct: 28, c: G.green },
              { l: "Não controlo", v: 19, pct: 17, c: G.red },
            ].map((d, i) => (
              <div key={i} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ color: G.sub, fontSize: 14 }}>{d.l}</span>
                  <span style={{ color: d.c, fontWeight: 700 }}>{d.pct}% · {d.v} pessoas</span>
                </div>
                <div style={{ height: 10, borderRadius: 5, background: "rgba(255,255,255,.06)", overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 5, background: d.c, width: on ? `${d.pct}%` : "0%", transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${i * .15}s`, boxShadow: `0 0 12px ${d.c}60` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Como controla os gastos?</div>
          <OpCards data={D.comoControla} animate={on} />
        </div>
      </div>
    </Screen>
  );
}

function S_Guarda() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#08080c" glow={G.purple}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.purple}>Guardar dinheiro</Label>
        <BigNum target={68} color={G.purple} trigger={on} />
        <H>raramente ou às vezes consegue guardar</H>
        <Phrase>Guardar dinheiro ainda não faz parte da realidade de muitos jovens.</Phrase>
        <Insight color={G.purple}>Mesmo entre participantes economicamente ativos, muitas pessoas relataram dificuldade para terminar o mês com algum valor disponível. Isso mostra como educação financeira e planejamento ainda são desafios importantes.</Insight>
        <div style={{ marginTop: 44 }}><OpCards data={D.guarda} animate={on} /></div>
        <div style={{ marginTop: 60 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Reserva de emergência</div>
          <div style={{ fontSize: "clamp(52px,10vw,96px)", fontWeight: 900, color: G.red, lineHeight: .9, letterSpacing: "-0.04em", marginBottom: 10, textShadow: `0 0 40px ${G.red}35` }}>
            <AnimNum target={41} suffix="%" trigger={on} />
          </div>
          <div style={{ color: G.sub, fontSize: "clamp(15px,2vw,19px)", marginBottom: 32 }}>não tem reserva de emergência</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 440, margin: "0 auto" }}>
            {D.reserva.map((d, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "17px 22px", borderRadius: 14, background: "rgba(255,255,255,.03)", border: `1px solid ${d.c}25`, opacity: on ? 1 : 0, transform: on ? "none" : "translateX(-20px)", transition: `all .55s cubic-bezier(.16,1,.3,1) ${i * .12}s` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.c, boxShadow: `0 0 8px ${d.c}` }} />
                  <span style={{ color: G.sub, fontSize: 15 }}>{d.l}</span>
                </div>
                <div>
                  <div style={{ color: d.c, fontWeight: 800, fontSize: 26 }}>{Math.round(d.v / 109 * 100)}%</div>
                  <div style={{ color: G.muted, fontSize: 11 }}>{d.v} pessoas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function S_Desafios() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#0a0a08" glow={G.yellow}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 620, width: "100%", zIndex: 1 }}>
        <Label color={G.yellow}>Principais desafios</Label>
        <H size="clamp(22px,4vw,38px)">O maior problema não é investir.<br />É conseguir organizar a vida financeira.</H>
        <Phrase>Esse resultado reforça que a dificuldade está muito antes dos investimentos: ela começa no dia a dia.</Phrase>
        <Insight color={G.yellow}>Quando perguntamos sobre os maiores desafios, a resposta foi clara: controlar gastos e se organizar financeiramente aparecem bem à frente de qualquer outro problema.</Insight>
        <div style={{ marginTop: 44 }}><Ranking data={D.desafio} animate={on} /></div>
      </div>
    </Screen>
  );
}

function S_Cartao() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#0a0808" glow={G.red}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.orange}>Cartão de crédito</Label>
        <BigNum target={80} color={G.orange} trigger={on} />
        <H>têm cartão de crédito</H>
        <Phrase>O cartão de crédito já faz parte da rotina da Geração Z.</Phrase>
        <Insight color={G.orange}>Apesar da popularidade do cartão, atrasos ainda aparecem entre parte dos participantes, mostrando que acesso ao crédito não significa necessariamente controle financeiro.</Insight>
        <div style={{ marginTop: 44, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {D.atrasou.map((d, i) => (
            <div key={i} style={{ flex: "1 1 180px", maxWidth: 220, padding: "28px 20px", borderRadius: 20, background: `${d.c}08`, border: `1px solid ${d.c}25`, textAlign: "center", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `all .6s ease ${i * .15}s` }}>
              <div style={{ color: d.c, fontWeight: 900, fontSize: 54, lineHeight: 1 }}>{d.v}</div>
              <div style={{ color: G.muted, fontSize: 14, marginTop: 8 }}>{d.l}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Com que frequência parcela?</div>
          <OpCards data={D.parcela} animate={on} />
        </div>
        <div style={{ marginTop: 40 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Compra por impulso (escala 1–5)</div>
          <ScaleChart data={D.impulso} animate={on} />
        </div>
      </div>
    </Screen>
  );
}

function S_Categorias() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#080a08" glow={G.orange}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.orange}>Onde vai o dinheiro</Label>
        <BigNum target={78} color={G.orange} trigger={on} />
        <H>pessoas citaram alimentação como maior gasto</H>
        <Phrase>Alimentação foi a categoria mais citada, e por uma margem bastante expressiva.</Phrase>
        <Insight color={G.orange}>Um dado interessante: o maior gasto está ligado a necessidades básicas. Isso mostra que muitos jovens não estão gastando excessivamente com luxo, mas lidando com custos do cotidiano.</Insight>
        <div style={{ marginTop: 44, maxWidth: 520, margin: "44px auto 0" }}>
          <HBars data={D.categorias} animate={on} maxOverride={100} />
        </div>
      </div>
    </Screen>
  );
}

function S_Bancos() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#080a0a" glow={G.green}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.green}>Bancos</Label>
        <BigNum target={60} color={G.green} trigger={on} />
        <H>usa exclusivamente banco digital</H>
        <Phrase>Os bancos digitais já dominam a rotina financeira dos jovens.</Phrase>
        <Insight color={G.green}>Facilidade, experiência do aplicativo e confiança aparecem como fatores mais importantes na escolha de um banco.</Insight>
        <div style={{ marginTop: 44 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Tipo de banco preferido</div>
          <OpCards data={D.tipoBanco} animate={on} />
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Bancos mais utilizados</div>
          <Ranking data={D.bancos} animate={on} />
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>O que mais influencia a escolha do banco?</div>
          <div style={{ maxWidth: 520, margin: "0 auto" }}><HBars data={D.influencia} animate={on} maxOverride={100} /></div>
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Confiança em bancos digitais (1–5)</div>
          <ScaleChart data={D.confiaBanco} animate={on} />
        </div>
      </div>
    </Screen>
  );
}

function S_Invest() {
  const [ref, on] = useReveal();
  return (
    <Screen bg="#08080e" glow={G.purple}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 640, width: "100%", zIndex: 1 }}>
        <Label color={G.purple}>Investimentos</Label>
        <H size="clamp(22px,4vw,38px)">O interesse em investir é maior do que o número de investidores.</H>
        <Phrase>Existe uma geração interessada em construir patrimônio, mas muitos ainda estão dando os primeiros passos.</Phrase>
        <Insight color={G.purple}>Quando somamos quem já investe com quem pretende começar, chegamos a 57% dos participantes. O interesse é real, o que falta é o primeiro passo.</Insight>
        <div style={{ marginTop: 44, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          {D.investe.map((d, i) => (
            <div key={i} style={{ flex: "1 1 140px", maxWidth: 180, padding: "26px 16px", borderRadius: 18, background: `${d.c}10`, border: `1px solid ${d.c}28`, textAlign: "center", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `all .6s ease ${i * .12}s` }}>
              <div style={{ color: d.c, fontWeight: 900, fontSize: 44, lineHeight: 1 }}>{Math.round(d.v / 109 * 100)}%</div>
              <div style={{ color: G.muted, fontSize: 13, marginTop: 8 }}>{d.l}</div>
              <div style={{ color: G.muted, fontSize: 11 }}>{d.v} pessoas</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Onde investe ou gostaria de investir?</div>
          <HBars data={D.ondeInveste} animate={on} />
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Nível de conhecimento sobre investimentos (1–5)</div>
          <div style={{ color: G.red, fontWeight: 700, fontSize: 32, marginBottom: 8 }}>
            <AnimNum target={66} suffix="%" trigger={on} /> têm nível 1 ou 2
          </div>
          <ScaleChart data={D.nivelInvest} animate={on} />
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>O que mais impede de investir?</div>
          <OpCards data={D.impedeInvestir} animate={on} />
        </div>
        <div style={{ marginTop: 48 }}>
          <div style={{ color: G.muted, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 20 }}>Onde aprende sobre finanças?</div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {D.aprende.map((d, i) => {
              const sizes = [124, 108, 96, 84, 72, 62, 48];
              const sz = sizes[i] || 48;
              const bc = P[i % P.length];
              return (
                <div key={i} style={{ width: sz, height: sz, borderRadius: "50%", background: `${bc}10`, border: `2px solid ${bc}35`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(.4)", transition: `all .65s cubic-bezier(.34,1.56,.64,1) ${i * .1}s`, flexShrink: 0 }}>
                  <div style={{ color: bc, fontWeight: 900, fontSize: sz > 85 ? 20 : 15, lineHeight: 1 }}>{d.v}</div>
                  <div style={{ color: G.sub, fontSize: sz > 85 ? 9 : 8, textAlign: "center", padding: "0 5px", lineHeight: 1.3, marginTop: 3 }}>{d.l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Screen>
  );
}

function S_Highlights() {
  const [ref, on] = useReveal();
  const cards = [
    { icon: "💡", color: G.teal, title: "A maioria não controla os gastos", text: "72% dos jovens não possui uma rotina consistente de controle financeiro. Controle é a base de tudo, sem ele, qualquer objetivo financeiro fica mais difícil." },
    { icon: "💰", color: G.purple, title: "Guardar dinheiro ainda é um desafio", text: "68% raramente ou às vezes consegue guardar algo no fim do mês. O planejamento ainda não virou hábito para grande parte da Geração Z." },
    { icon: "📋", color: G.yellow, title: "O maior problema é a organização", text: "Controlar gastos e organização financeira aparecem como os maiores desafios, muito antes de qualquer questão com investimentos." },
    { icon: "🍽️", color: G.orange, title: "Alimentação lidera os gastos", text: "O maior gasto declarado é com alimentação, não com luxo ou lazer. Isso revela uma realidade cotidiana, não de excesso." },
    { icon: "📱", color: G.green, title: "Bancos digitais dominam a preferência", text: "60% usa exclusivamente banco digital. O Nubank lidera com ampla vantagem, e a facilidade do app é o principal critério de escolha." },
    { icon: "🌱", color: G.blue, title: "Interesse em investir existe, mas faltam hábitos", text: "57% já investe ou pretende começar. O desejo de construir patrimônio é real, mas falta de conhecimento e de dinheiro ainda travam a ação." },
  ];
  return (
    <Screen bg="#080808" glow={G.teal}>
      <Particles />
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%", zIndex: 1 }}>
        <Label color={G.teal}>O que mais me chamou atenção</Label>
        <H size="clamp(24px,5vw,42px)">6 conclusões sobre a Geração Z e o dinheiro</H>
        <Phrase>Uma leitura honesta feita por mim mesma.</Phrase>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18, marginTop: 44, textAlign: "left" }}>
          {cards.map((c, i) => (
            <div key={i} style={{ padding: "28px 26px", borderRadius: 20, background: `${c.color}09`, border: `1px solid ${c.color}22`, opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `all .65s cubic-bezier(.16,1,.3,1) ${i * .1}s` }}>
              <div style={{ fontSize: 30, marginBottom: 14 }}>{c.icon}</div>
              <div style={{ color: c.color, fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{c.title}</div>
              <div style={{ color: G.sub, fontSize: 14, lineHeight: 1.7 }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

function Final() {
  const [ref, on] = useReveal();
  return (
    <Screen glow={G.green}>
      <Particles />
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(40px)", transition: "all .9s cubic-bezier(.16,1,.3,1)", maxWidth: 600, width: "100%", zIndex: 1 }}>
        <H size="clamp(26px,5vw,48px)">Obrigada por explorar os dados!</H>
        <Phrase>Esta pesquisa foi realizada em 2026 com jovens brasileiros da Geração Z. Todos os dados são reais e anônimos.</Phrase>

        <div style={{ marginTop: 60, color: "#2a2a2a", fontSize: 11 }}>Pesquisa realizada em 2026</div>
      </div>
    </Screen>
  );
}

export default function App() {
  return (
    <div style={{ background: G.bg, minHeight: "100vh", fontFamily: "'Inter','Segoe UI',system-ui,sans-serif", color: G.text }}>
      <ProgressBar />
      <Hero />
      <S_Perfil />
      <S_Controle />
      <S_Guarda />
      <S_Desafios />
      <S_Cartao />
      <S_Categorias />
      <S_Bancos />
      <S_Invest />
      <S_Highlights />
      <Final />
    </div>
  );
}