export const strings = {
  pt: {
    appTitle: "Gerador de Currículo",
    appSubtitle: "Crie seu currículo profissional em PDF em minutos.",
    skipToContent: "Pular para o conteúdo principal",
    back: "Voltar",
    nextStep: "Próximo Passo",
    generatePdf: "Gerar Currículo PDF",
    generating: "Gerando PDF...",
    errorGenerating: "Houve um erro ao gerar o currículo. Tente novamente.",
    steps: {
      personal: "Pessoal",
      objective: "Objetivo",
      education: "Formação",
      experience: "Experiência",
      skills: "Habilidades"
    }
  }
};

export const t = (key, locale = 'pt') => {
  const keys = key.split('.');
  let value = strings[locale];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};
