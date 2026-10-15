import { Wind, Leaf, BookOpen, Heart, Sparkles, Moon } from "lucide-react";

export const START_DATE = "2026-10-15";
export const SPECIAL_DATE = "2026-10-19";
export const JOURNEY_LENGTH = 15;

export const tasks = [
  {
    id: "exercise",
    title: "Exercício físico",
    detail: "30 minutos de movimento",
    icon: Wind,
  },
  {
    id: "food",
    title: "Alimentação consciente",
    detail: "Sem guloseimas e lanches",
    icon: Leaf,
  },
  {
    id: "bible",
    title: "Leitura bíblica",
    detail: "Separar um tempo para a Palavra",
    icon: BookOpen,
  },
  {
    id: "prayer",
    title: "Oração",
    detail: "Tempo de conversa com Deus",
    icon: Heart,
  },
  {
    id: "sugar",
    title: "Zero açúcar",
    detail: "Prática opcional",
    icon: Sparkles,
    optional: true,
  },
  {
    id: "social",
    title: "Pausa das redes sociais",
    detail: "Reduzir distrações digitais",
    icon: Moon,
  },
];

export const motives = [
  "Fortalecimento espiritual",
  "Relacionamento com Deus",
  "Família",
  "Equilíbrio emocional",
  "Sabedoria",
  "Decisões do empreendimento",
  "Direcionamento profissional",
];
