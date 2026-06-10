import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#FFFFFF",
  bgAlt: "#FAFAFA",
  bgLight: "#F4F6F8",
  border: "rgba(22,59,59,0.07)",
  borderMed: "rgba(22,59,59,0.13)",
  green: "#7BE34D",
  greenSoft: "#B8F28E",
  greenDark: "#4DB840",
  text: "#163B3B",
  sub: "#5F6B75",
  muted: "#94A3B8",
  red: "#EF4444",
  orange: "#F97316",
  blue: "#3B82F6",
  yellow: "#D97706",
  purple: "#7C3AED",
  teal: "#0D9488",
};

const P = [C.green, C.teal, C.purple, C.yellow, C.red, C.orange, C.blue, "#06B6D4", "#EC4899", "#14B8A6"];

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
  reserva:      [{ l: "Não tenho", v: 45, c: C.red }, { l: "Tenho", v: 43, c: C.green }, { l: "Estou construindo", v: 21, c: C.yellow }],
  desafio:      [{ l: "Controlar gastos", v: 53, m: "🥇" }, { l: "Organização financeira", v: 45, m: "🥈" }, { l: "Ganhar mais", v: 35, m: "🥉" }, { l: "Conseguir investir", v: 34, m: "🏅" }, { l: "Educação financeira", v: 34, m: "🎯" }, { l: "Dívidas", v: 25, m: "📌" }],
  cartao:       [{ l: "Sim", v: 87 }, { l: "Não", v: 22 }],
  parcela:      [{ l: "Às vezes", v: 49 }, { l: "Frequentemente", v: 34 }, { l: "Nunca", v: 17 }, { l: "Sempre", v: 9 }],
  atrasou:      [{ l: "Não atrasou", v: 57, c: C.green }, { l: "Já atrasou", v: 52, c: C.red }],
  categorias:   [{ l: "Alimentação", v: 78 }, { l: "Lazer", v: 53 }, { l: "Roupas", v: 45 }, { l: "Delivery", v: 43 }, { l: "Transporte", v: 31 }, { l: "Estudos", v: 20 }, { l: "Streaming", v: 18 }, { l: "Jogos", v: 14 }, { l: "Tecnologia", v: 14 }],
  impulso:      [{ l: "1", v: 18 }, { l: "2", v: 23 }, { l: "3", v: 32 }, { l: "4", v: 22 }, { l: "5", v: 14 }],
  tipoBanco:    [{ l: "Banco digital", v: 66 }, { l: "Uso ambos", v: 33 }, { l: "Banco tradicional", v: 10 }],
  bancos:       [{ l: "Nubank", v: 68, m: "🥇" }, { l: "Itaú Unibanco", v: 35, m: "🥈" }, { l: "Inter", v: 23, m: "🥉" }, { l: "Santander", v: 14, m: "4°" }, { l: "Bradesco", v: 13, m: "5°" }, { l: "Banco do Brasil", v: 8, m: "6°" }, { l: "C6 Bank", v: 5, m: "7°" }, { l: "PicPay", v: 5, m: "8°" }, { l: "Mercado Pago", v: 5, m: "9°" }],
  influencia:   [{ l: "Facilidade do app", v: 85 }, { l: "Cartão de crédito", v: 41 }, { l: "Marca/confiança", v: 40 }, { l: "Rendimento da conta", v: 35 }, { l: "Investimentos", v: 21 }, { l: "Indicação de amigos", v: 14 }, { l: "Atendimento", v: 11 }, { l: "Taxas", v: 11 }, { l: "Cashback", v: 5 }],
  confiaBanco:  [{ l: "1", v: 6 }, { l: "2", v: 7 }, { l: "3", v: 32 }, { l: "4", v: 30 }, { l: "5", v: 34 }],
  investe:      [{ l: "Não investe", v: 47, c: C.muted }, { l: "Quer começar", v: 32, c: C.teal }, { l: "Investe", v: 30, c: C.green }],
  ondeInveste:  [{ l: "Não conheço invest.", v: 36 }, { l: "CDB", v: 35 }, { l: "Poupança", v: 25 }, { l: "Fundos imobiliários", v: 21 }, { l: "Tesouro Direto", v: 20 }, { l: "Ações", v: 19 }, { l: "Criptomoedas", v: 15 }],
  nivelInvest:  [{ l: "1 – Nenhum", v: 31 }, { l: "2", v: 41 }, { l: "3 – Básico", v: 29 }, { l: "4", v: 7 }, { l: "5 – Avançado", v: 1 }],
  impedeInvestir:[{ l: "Falta de conhecimento", v: 62 }, { l: "Falta de dinheiro", v: 56 }, { l: "Não sei por onde começar", v: 40 }, { l: "Medo de perder dinheiro", v: 24 }, { l: "Não tenho interesse", v: 4 }],
  aprende:      [{ l: "YouTube", v: 49 }, { l: "Nunca estudei", v: 35 }, { l: "Amigos/família", v: 33 }, { l: "TikTok", v: 26 }, { l: "Instagram", v: 19 }, { l: "Cursos", v: 16 }, { l: "Faculdade", v: 4 }],
};

const FONT = "'Plus Jakarta Sans', 'Inter', 'Segoe UI', system-ui, sans-serif";

const CSS = `
  @keyframes scrollBounce { from { transform: translateY(0); } to { transform: translateY(8px); } }
  @keyframes pulseDot { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.25); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  html, body { margin: 0; padding: 0; background: #FFFFFF; }
  html { scroll-behavior: smooth; }
  * { box-sizing: border-box; }

  .fcard {
    transition: transform 0.22s ease, box-shadow 0.22s ease;
  }
  .fcard:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 40px rgba(22,59,59,0.13) !important;
  }

  @media (max-width: 768px) {
    .sec-pad { padding: 72px 20px !important; }
    .hero-pad { padding: 100px 20px 80px !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .sec-pad { padding: 88px 24px !important; }
    .hero-pad { padding: 120px 24px 100px !important; }
  }
`;

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
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: C.bgLight, zIndex: 100 }}>
      <div style={{ height: "100%", width: `${p}%`, background: C.green, transition: "width .1s linear", borderRadius: "0 2px 2px 0" }} />
    </div>
  );
}

function Sec({ children, id, bg = C.bg }) {
  return (
    <section id={id} className="sec-pad" style={{ padding: "100px 40px", background: bg, position: "relative", overflow: "hidden" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1280, width: "100%", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        {children}
      </div>
    </section>
  );
}

function Tag({ accent = C.green, children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 16px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.bgLight, marginBottom: 24, fontFamily: FONT }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: accent, flexShrink: 0 }} />
      <span style={{ fontSize: 11, letterSpacing: "0.11em", textTransform: "uppercase", fontWeight: 700, color: C.sub }}>{children}</span>
    </div>
  );
}

function H({ children, size = "clamp(24px,4vw,38px)" }) {
  return (
    <h2 style={{ fontSize: size, fontWeight: 800, color: C.text, margin: "0 0 18px", letterSpacing: "-0.025em", lineHeight: 1.18, fontFamily: FONT }}>
      {children}
    </h2>
  );
}

function Phrase({ children }) {
  return (
    <p style={{ fontSize: "clamp(16px,2.2vw,19px)", color: C.sub, margin: "0 0 24px", lineHeight: 1.7, maxWidth: 580, marginLeft: "auto", marginRight: "auto", fontFamily: FONT }}>
      {children}
    </p>
  );
}

function Insight({ children }) {
  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "20px 24px 20px 28px", borderRadius: 16, background: C.bgLight, borderLeft: `3px solid ${C.green}`, textAlign: "left" }}>
      <p style={{ fontSize: "clamp(14px,1.9vw,16px)", color: C.sub, margin: 0, lineHeight: 1.75, fontStyle: "italic", fontFamily: FONT }}>
        {children}
      </p>
    </div>
  );
}

function BigNum({ target, suffix = "%", trigger }) {
  return (
    <div style={{ fontFamily: FONT, marginBottom: 16 }}>
      <span style={{ fontSize: "clamp(80px,15vw,144px)", fontWeight: 800, color: C.text, lineHeight: 0.9, letterSpacing: "-0.05em" }}>
        <AnimNum target={target} suffix={suffix} trigger={trigger} />
      </span>
    </div>
  );
}

function SectionTitle({ label, accent, title, phrase }) {
  return (
    <div style={{ marginBottom: 56 }}>
      <Tag accent={accent}>{label}</Tag>
      <H size="clamp(26px,4.5vw,42px)">{title}</H>
      {phrase && <Phrase>{phrase}</Phrase>}
    </div>
  );
}

function HBars({ data, animate, maxOverride }) {
  const max = maxOverride || Math.max(...data.map(d => d.v));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
      {data.map((d, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
            <span style={{ color: C.sub, fontSize: 14, fontFamily: FONT }}>{d.l}</span>
            <span style={{ color: C.text, fontWeight: 700, fontSize: 14, fontFamily: FONT }}>{d.v}</span>
          </div>
          <div style={{ height: 8, borderRadius: 999, background: C.bgLight, overflow: "hidden" }}>
            <div style={{
              height: "100%", borderRadius: 999,
              background: d.c || P[i % P.length],
              width: animate ? `${(d.v / max) * 100}%` : "0%",
              transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${i * .08}s`,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function OpCards({ data, animate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%", maxWidth: 460, margin: "0 auto" }}>
      {data.map((d, i) => (
        <div key={i} className="fcard" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px", borderRadius: 16,
          background: "#FFFFFF",
          border: `1px solid ${C.border}`,
          boxShadow: "0 1px 4px rgba(22,59,59,0.05)",
          opacity: animate ? 1 : 0,
          transform: animate ? "none" : "translateX(-20px)",
          transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${i * .1}s, transform .55s cubic-bezier(.16,1,.3,1) ${i * .1}s`,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.c || P[i % P.length], flexShrink: 0 }} />
            <span style={{ color: C.sub, fontSize: 15, fontFamily: FONT }}>{d.l}</span>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: C.text, fontWeight: 800, fontSize: 22, fontFamily: FONT }}>{d.v}</div>
            <div style={{ color: C.muted, fontSize: 11, fontFamily: FONT }}>{Math.round(d.v / 109 * 100)}%</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScaleChart({ data, animate }) {
  const max = Math.max(...data.map(d => d.v));
  const sc = [C.red, C.orange, C.yellow, C.teal, C.green];
  return (
    <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center", height: 180, maxWidth: 420, margin: "0 auto", width: "100%" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ color: C.text, fontWeight: 700, fontSize: 15, fontFamily: FONT }}>{d.v}</div>
          <div style={{
            width: "100%", borderRadius: "8px 8px 0 0", background: sc[i],
            height: animate ? `${(d.v / max) * 140}px` : "0px",
            transition: `height .9s cubic-bezier(.4,0,.2,1) ${i * .1}s`,
          }} />
          <div style={{ color: C.muted, fontSize: 11, fontFamily: FONT }}>{d.l}</div>
        </div>
      ))}
    </div>
  );
}

function Ranking({ data, animate }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 540, margin: "0 auto", width: "100%" }}>
      {data.map((d, i) => (
        <div key={i} className="fcard" style={{
          display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 16,
          background: i === 0 ? `rgba(123,227,77,0.07)` : "#FFFFFF",
          border: i === 0 ? `1px solid rgba(123,227,77,0.35)` : `1px solid ${C.border}`,
          boxShadow: "0 1px 4px rgba(22,59,59,0.05)",
          opacity: animate ? 1 : 0,
          transform: animate ? "none" : "translateX(-28px)",
          transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${i * .1}s, transform .55s cubic-bezier(.16,1,.3,1) ${i * .1}s`,
        }}>
          <span style={{ fontSize: i < 3 ? 22 : 15, minWidth: 34 }}>{d.m}</span>
          <span style={{ color: C.text, fontSize: 15, flex: 1, textAlign: "left", fontWeight: i === 0 ? 700 : 500, fontFamily: FONT }}>{d.l}</span>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 64, height: 5, borderRadius: 999, background: C.bgLight, overflow: "hidden" }}>
              <div style={{ width: animate ? `${(d.v / data[0].v) * 100}%` : "0%", height: "100%", borderRadius: 999, background: P[i % P.length], transition: `width 1s ease ${.3 + i * .08}s` }} />
            </div>
            <span style={{ color: C.text, fontWeight: 700, fontSize: 18, minWidth: 28, fontFamily: FONT }}>{d.v}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SubLabel({ children }) {
  return (
    <div style={{ color: C.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20, fontWeight: 600, fontFamily: FONT }}>
      {children}
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
    <section className="hero-pad" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "130px 40px 100px", background: C.bg, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <style>{CSS}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 20%, rgba(123,227,77,0.06) 0%, transparent 60%), radial-gradient(circle at 20% 80%, rgba(13,148,136,0.04) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(32px)",
        transition: "all 0.9s cubic-bezier(.16,1,.3,1)",
        maxWidth: 800, width: "100%", position: "relative", zIndex: 1,
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 9,
          padding: "8px 20px", borderRadius: 999,
          border: "1px solid rgba(123,227,77,0.30)", background: "rgba(123,227,77,0.07)",
          marginBottom: 52,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, animation: "pulseDot 2s ease-in-out infinite" }} />
          <span style={{ color: C.text, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, fontFamily: FONT }}>{count} respostas coletadas</span>
        </div>

        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, color: C.text, margin: "0 0 12px", lineHeight: 1.06, letterSpacing: "-0.035em", fontFamily: FONT }}>
          Raio-X Financeiro
        </h1>
        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, margin: "0 0 36px", lineHeight: 1.06, letterSpacing: "-0.035em", fontFamily: FONT }}>
          <span style={{ color: C.green }}>da Geração Z Brasileira</span>
        </h1>

        <p style={{ color: C.sub, fontSize: "clamp(16px,2.2vw,20px)", margin: "0 0 72px", lineHeight: 1.7, maxWidth: 600, marginLeft: "auto", marginRight: "auto", fontFamily: FONT }}>
          Análise baseada nas respostas do formulário, revelando hábitos financeiros, desafios e comportamentos da geração que está construindo o futuro.
        </p>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <span style={{ color: C.muted, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: FONT }}>scroll para descobrir</span>
          <div style={{ width: 26, height: 42, borderRadius: 13, border: `1px solid ${C.borderMed}`, display: "flex", justifyContent: "center", paddingTop: 7 }}>
            <div style={{ width: 4, height: 9, borderRadius: 2, background: C.green, animation: "scrollBounce 1.4s ease-in-out infinite alternate" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function S_Perfil() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bgAlt}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 1100, width: "100%" }}>
        <SectionTitle label="Quem respondeu" accent={C.purple} title="Perfil dos participantes" phrase="110 jovens brasileiros compartilharam sua realidade financeira." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20, textAlign: "left" }}>
          {[
            { title: "Faixa etária", data: D.idade, accent: C.teal },
            { title: "Gênero", data: D.genero, accent: C.purple },
            { title: "Estado", data: D.estado, accent: C.blue },
            { title: "Escolaridade", data: D.escolaridade, accent: C.green },
            { title: "Situação atual", data: D.situacao, accent: C.yellow },
            { title: "Faixa de renda mensal", data: D.renda, accent: C.orange },
          ].map((c, ci) => (
            <div key={ci} className="fcard" style={{ padding: "28px 24px", borderRadius: 24, background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(22,59,59,0.04), 0 6px 20px rgba(22,59,59,0.06)", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${ci * .09}s, transform .65s cubic-bezier(.16,1,.3,1) ${ci * .09}s` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: c.accent }} />
                <span style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.09em", fontWeight: 700, color: C.muted, fontFamily: FONT }}>{c.title}</span>
              </div>
              <HBars data={c.data} animate={on} />
            </div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

function S_Controle() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bg}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.teal}>Controle financeiro</Tag>
        <BigNum target={72} trigger={on} />
        <H size="clamp(22px,4vw,34px)">não controlam os gastos de forma consistente</H>
        <Phrase>A maior parte dos participantes não possui uma rotina consistente de controle financeiro.</Phrase>
        <Insight>Esse foi um dos dados que mais me chamou atenção. Se não existe clareza sobre para onde o dinheiro está indo, fica muito mais difícil construir hábitos financeiros saudáveis.</Insight>

        <div style={{ marginTop: 56 }}>
          <SubLabel>Como declararam controlar</SubLabel>
          <div style={{ maxWidth: 500, margin: "0 auto" }}>
            {[
              { l: "Às vezes", v: 60, pct: 55, c: C.teal },
              { l: "Sim, rigorosamente", v: 30, pct: 28, c: C.green },
              { l: "Não controlo", v: 19, pct: 17, c: C.red },
            ].map((d, i) => (
              <div key={i} style={{ marginBottom: 18 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                  <span style={{ color: C.sub, fontSize: 14, fontFamily: FONT }}>{d.l}</span>
                  <span style={{ color: d.c, fontWeight: 700, fontFamily: FONT }}>{d.pct}% · {d.v} pessoas</span>
                </div>
                <div style={{ height: 10, borderRadius: 999, background: C.bgLight, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 999, background: d.c, width: on ? `${d.pct}%` : "0%", transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${i * .15}s` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>Como controla os gastos?</SubLabel>
          <OpCards data={D.comoControla} animate={on} />
        </div>
      </div>
    </Sec>
  );
}

function S_Guarda() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bgAlt}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.purple}>Guardar dinheiro</Tag>
        <BigNum target={68} trigger={on} />
        <H size="clamp(22px,4vw,34px)">raramente ou às vezes consegue guardar</H>
        <Phrase>Guardar dinheiro ainda não faz parte da realidade de muitos jovens.</Phrase>
        <Insight>Mesmo entre participantes economicamente ativos, muitas pessoas relataram dificuldade para terminar o mês com algum valor disponível. Isso mostra como educação financeira e planejamento ainda são desafios importantes.</Insight>

        <div style={{ marginTop: 52 }}><OpCards data={D.guarda} animate={on} /></div>

        <div style={{ marginTop: 72 }}>
          <SubLabel>Reserva de emergência</SubLabel>
          <div style={{ fontSize: "clamp(56px,10vw,100px)", fontWeight: 800, color: C.red, lineHeight: 0.9, letterSpacing: "-0.04em", marginBottom: 12, fontFamily: FONT }}>
            <AnimNum target={41} suffix="%" trigger={on} />
          </div>
          <div style={{ color: C.sub, fontSize: "clamp(15px,2vw,19px)", marginBottom: 36, fontFamily: FONT }}>não tem reserva de emergência</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 460, margin: "0 auto" }}>
            {D.reserva.map((d, i) => (
              <div key={i} className="fcard" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 22px", borderRadius: 16, background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 1px 4px rgba(22,59,59,0.05)", opacity: on ? 1 : 0, transform: on ? "none" : "translateX(-20px)", transition: `opacity .55s cubic-bezier(.16,1,.3,1) ${i * .12}s, transform .55s cubic-bezier(.16,1,.3,1) ${i * .12}s` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: d.c }} />
                  <span style={{ color: C.sub, fontSize: 15, fontFamily: FONT }}>{d.l}</span>
                </div>
                <div>
                  <div style={{ color: d.c, fontWeight: 800, fontSize: 26, fontFamily: FONT }}>{Math.round(d.v / 109 * 100)}%</div>
                  <div style={{ color: C.muted, fontSize: 11, fontFamily: FONT }}>{d.v} pessoas</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Sec>
  );
}

function S_Desafios() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bg}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 680, width: "100%" }}>
        <Tag accent={C.yellow}>Principais desafios</Tag>
        <H size="clamp(22px,4vw,38px)">O maior problema não é investir.<br />É conseguir organizar a vida financeira.</H>
        <Phrase>Esse resultado reforça que a dificuldade está muito antes dos investimentos: ela começa no dia a dia.</Phrase>
        <Insight>Quando perguntamos sobre os maiores desafios, a resposta foi clara: controlar gastos e se organizar financeiramente aparecem bem à frente de qualquer outro problema.</Insight>
        <div style={{ marginTop: 52 }}><Ranking data={D.desafio} animate={on} /></div>
      </div>
    </Sec>
  );
}

function S_Cartao() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bgAlt}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.orange}>Cartão de crédito</Tag>
        <BigNum target={80} trigger={on} />
        <H size="clamp(22px,4vw,34px)">têm cartão de crédito</H>
        <Phrase>O cartão de crédito já faz parte da rotina da Geração Z.</Phrase>
        <Insight>Apesar da popularidade do cartão, atrasos ainda aparecem entre parte dos participantes, mostrando que acesso ao crédito não significa necessariamente controle financeiro.</Insight>

        <div style={{ marginTop: 52, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {D.atrasou.map((d, i) => (
            <div key={i} className="fcard" style={{ flex: "1 1 180px", maxWidth: 230, padding: "32px 24px", borderRadius: 24, background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(22,59,59,0.04), 0 6px 20px rgba(22,59,59,0.07)", textAlign: "center", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `opacity .6s ease ${i * .15}s, transform .6s ease ${i * .15}s` }}>
              <div style={{ color: d.c, fontWeight: 800, fontSize: 56, lineHeight: 1, fontFamily: FONT }}>{d.v}</div>
              <div style={{ width: 32, height: 3, borderRadius: 999, background: d.c, margin: "12px auto 10px", opacity: 0.5 }} />
              <div style={{ color: C.sub, fontSize: 14, fontFamily: FONT }}>{d.l}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>Com que frequência parcela?</SubLabel>
          <OpCards data={D.parcela} animate={on} />
        </div>
        <div style={{ marginTop: 56 }}>
          <SubLabel>Compra por impulso (escala 1–5)</SubLabel>
          <ScaleChart data={D.impulso} animate={on} />
        </div>
      </div>
    </Sec>
  );
}

function S_Categorias() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bg}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.orange}>Onde vai o dinheiro</Tag>
        <BigNum target={78} trigger={on} />
        <H size="clamp(22px,4vw,34px)">pessoas citaram alimentação como maior gasto</H>
        <Phrase>Alimentação foi a categoria mais citada, e por uma margem bastante expressiva.</Phrase>
        <Insight>Um dado interessante: o maior gasto está ligado a necessidades básicas. Isso mostra que muitos jovens não estão gastando excessivamente com luxo, mas lidando com custos do cotidiano.</Insight>
        <div style={{ marginTop: 52, maxWidth: 540, margin: "52px auto 0" }}>
          <HBars data={D.categorias} animate={on} maxOverride={100} />
        </div>
      </div>
    </Sec>
  );
}

function S_Bancos() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bgAlt}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.green}>Bancos</Tag>
        <BigNum target={60} trigger={on} />
        <H size="clamp(22px,4vw,34px)">usa exclusivamente banco digital</H>
        <Phrase>Os bancos digitais já dominam a rotina financeira dos jovens.</Phrase>
        <Insight>Facilidade, experiência do aplicativo e confiança aparecem como fatores mais importantes na escolha de um banco.</Insight>

        <div style={{ marginTop: 56 }}>
          <SubLabel>Tipo de banco preferido</SubLabel>
          <OpCards data={D.tipoBanco} animate={on} />
        </div>
        <div style={{ marginTop: 60 }}>
          <SubLabel>Bancos mais utilizados</SubLabel>
          <Ranking data={D.bancos} animate={on} />
        </div>
        <div style={{ marginTop: 60 }}>
          <SubLabel>O que mais influencia a escolha do banco?</SubLabel>
          <div style={{ maxWidth: 540, margin: "0 auto" }}><HBars data={D.influencia} animate={on} maxOverride={100} /></div>
        </div>
        <div style={{ marginTop: 60 }}>
          <SubLabel>Confiança em bancos digitais (1–5)</SubLabel>
          <ScaleChart data={D.confiaBanco} animate={on} />
        </div>
      </div>
    </Sec>
  );
}

function S_Invest() {
  const [ref, on] = useReveal();
  return (
    <Sec bg={C.bg}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 720, width: "100%" }}>
        <Tag accent={C.purple}>Investimentos</Tag>
        <H size="clamp(22px,4vw,38px)">O interesse em investir é maior do que o número de investidores.</H>
        <Phrase>Existe uma geração interessada em construir patrimônio, mas muitos ainda estão dando os primeiros passos.</Phrase>
        <Insight>Quando somamos quem já investe com quem pretende começar, chegamos a 57% dos participantes. O interesse é real, o que falta é o primeiro passo.</Insight>

        <div style={{ marginTop: 52, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {D.investe.map((d, i) => (
            <div key={i} className="fcard" style={{ flex: "1 1 140px", maxWidth: 190, padding: "28px 20px", borderRadius: 24, background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(22,59,59,0.04), 0 6px 20px rgba(22,59,59,0.07)", textAlign: "center", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `opacity .6s ease ${i * .12}s, transform .6s ease ${i * .12}s` }}>
              <div style={{ color: d.c, fontWeight: 800, fontSize: 44, lineHeight: 1, fontFamily: FONT }}>{Math.round(d.v / 109 * 100)}%</div>
              <div style={{ width: 24, height: 3, borderRadius: 999, background: d.c, margin: "10px auto 10px", opacity: 0.5 }} />
              <div style={{ color: C.sub, fontSize: 13, fontFamily: FONT }}>{d.l}</div>
              <div style={{ color: C.muted, fontSize: 11, marginTop: 4, fontFamily: FONT }}>{d.v} pessoas</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>Onde investe ou gostaria de investir?</SubLabel>
          <HBars data={D.ondeInveste} animate={on} />
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>Nível de conhecimento sobre investimentos (1–5)</SubLabel>
          <div style={{ color: C.red, fontWeight: 800, fontSize: 30, marginBottom: 16, fontFamily: FONT }}>
            <AnimNum target={66} suffix="%" trigger={on} /> têm nível 1 ou 2
          </div>
          <ScaleChart data={D.nivelInvest} animate={on} />
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>O que mais impede de investir?</SubLabel>
          <OpCards data={D.impedeInvestir} animate={on} />
        </div>

        <div style={{ marginTop: 60 }}>
          <SubLabel>Onde aprende sobre finanças?</SubLabel>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14 }}>
            {D.aprende.map((d, i) => {
              const sizes = [124, 108, 96, 84, 72, 62, 48];
              const sz = sizes[i] || 48;
              const bc = P[i % P.length];
              return (
                <div key={i} className="fcard" style={{ width: sz, height: sz, borderRadius: "50%", background: "#FFFFFF", border: `2px solid ${bc}`, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", boxShadow: "0 2px 12px rgba(22,59,59,0.08)", opacity: on ? 1 : 0, transform: on ? "scale(1)" : "scale(.4)", transition: `opacity .65s cubic-bezier(.34,1.56,.64,1) ${i * .1}s, transform .65s cubic-bezier(.34,1.56,.64,1) ${i * .1}s`, flexShrink: 0 }}>
                  <div style={{ color: bc, fontWeight: 900, fontSize: sz > 85 ? 20 : 14, lineHeight: 1, fontFamily: FONT }}>{d.v}</div>
                  <div style={{ color: C.sub, fontSize: sz > 85 ? 9 : 8, textAlign: "center", padding: "0 5px", lineHeight: 1.3, marginTop: 3, fontFamily: FONT }}>{d.l}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Sec>
  );
}

function S_Highlights() {
  const [ref, on] = useReveal();
  const cards = [
    { icon: "💡", accent: C.teal, title: "A maioria não controla os gastos", text: "72% dos jovens não possui uma rotina consistente de controle financeiro. Controle é a base de tudo, sem ele, qualquer objetivo financeiro fica mais difícil." },
    { icon: "💰", accent: C.purple, title: "Guardar dinheiro ainda é um desafio", text: "68% raramente ou às vezes consegue guardar algo no fim do mês. O planejamento ainda não virou hábito para grande parte da Geração Z." },
    { icon: "📋", accent: C.yellow, title: "O maior problema é a organização", text: "Controlar gastos e organização financeira aparecem como os maiores desafios, muito antes de qualquer questão com investimentos." },
    { icon: "🍽️", accent: C.orange, title: "Alimentação lidera os gastos", text: "O maior gasto declarado é com alimentação, não com luxo ou lazer. Isso revela uma realidade cotidiana, não de excesso." },
    { icon: "📱", accent: C.green, title: "Bancos digitais dominam a preferência", text: "60% usa exclusivamente banco digital. O Nubank lidera com ampla vantagem, e a facilidade do app é o principal critério de escolha." },
    { icon: "🌱", accent: C.blue, title: "Interesse em investir existe, mas faltam hábitos", text: "57% já investe ou pretende começar. O desejo de construir patrimônio é real, mas falta de conhecimento e de dinheiro ainda travam a ação." },
  ];
  return (
    <Sec bg={C.bgAlt}>
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(32px)", transition: "all .8s cubic-bezier(.16,1,.3,1)", maxWidth: 1100, width: "100%" }}>
        <SectionTitle label="O que mais me chamou atenção" accent={C.teal} title="6 conclusões sobre a Geração Z e o dinheiro" phrase="Uma leitura honesta feita por mim mesma." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 20, textAlign: "left" }}>
          {cards.map((c, i) => (
            <div key={i} className="fcard" style={{ padding: "32px 28px", borderRadius: 24, background: "#FFFFFF", border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(22,59,59,0.04), 0 6px 20px rgba(22,59,59,0.07)", opacity: on ? 1 : 0, transform: on ? "none" : "translateY(20px)", transition: `opacity .65s cubic-bezier(.16,1,.3,1) ${i * .09}s, transform .65s cubic-bezier(.16,1,.3,1) ${i * .09}s` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: C.bgLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 18 }}>
                {c.icon}
              </div>
              <div style={{ width: 28, height: 3, borderRadius: 999, background: c.accent, marginBottom: 14 }} />
              <div style={{ color: C.text, fontWeight: 700, fontSize: 16, marginBottom: 12, fontFamily: FONT, lineHeight: 1.3 }}>{c.title}</div>
              <div style={{ color: C.sub, fontSize: 14, lineHeight: 1.75, fontFamily: FONT }}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>
    </Sec>
  );
}

function Final() {
  const [ref, on] = useReveal();
  return (
    <section style={{ padding: "120px 40px", background: C.text, textAlign: "center", position: "relative", overflow: "hidden" }}>
      <style>{CSS}</style>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 50% 50%, rgba(123,227,77,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(36px)", transition: "all .9s cubic-bezier(.16,1,.3,1)", maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 800, color: "#FFFFFF", margin: "0 0 24px", letterSpacing: "-0.025em", lineHeight: 1.15, fontFamily: FONT }}>
          Obrigada por explorar os dados!
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(16px,2.2vw,19px)", margin: "0 0 56px", lineHeight: 1.7, fontFamily: FONT }}>
          Esta pesquisa foi realizada em 2026 com jovens brasileiros da Geração Z.<br />Todos os dados são reais e anônimos.
        </p>
        <div style={{ width: 48, height: 3, borderRadius: 999, background: C.green, margin: "0 auto 0" }} />
        <div style={{ marginTop: 60, color: "rgba(255,255,255,0.25)", fontSize: 12, fontFamily: FONT, letterSpacing: "0.06em" }}>Pesquisa realizada em 2026</div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: FONT, color: C.text }}>
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
