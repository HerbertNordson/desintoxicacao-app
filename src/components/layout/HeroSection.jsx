import { Heart, Leaf, Sun } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          UM PROPÓSITO A DOIS
        </div>

        <h1>
          Menos ruído.
          <br />
          <em>Mais presença.</em>
        </h1>

        <p className="hero-text">
          15 dias para desacelerar, fortalecer a fé e abrir espaço para aquilo
          que realmente importa.
        </p>

        <div className="hero-meta">
          <span>
            <Sun size={15} /> 15 a 29 de outubro
          </span>
          <span className="meta-divider" />
          <span>
            <Heart size={15} /> Você + Jéssica
          </span>
        </div>
      </div>

      <div className="hero-art" aria-hidden="true">
        <div className="sun-disc" />
        <div className="art-circle art-circle-one" />
        <div className="art-circle art-circle-two" />
        <div className="art-leaf">
          <Leaf size={82} strokeWidth={0.8} />
        </div>

        <div className="art-caption">
          “Aquietai-vos e sabei
          <br />
          que eu sou Deus.”
          <small>Salmos 46:10</small>
        </div>
      </div>
    </section>
  );
}
