import { createContext, useState, useContext } from 'react';

const ResumeContext = createContext();

export const useResume = () => useContext(ResumeContext);

export const ResumeProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [dadosPessoais, setDadosPessoais] = useState({
    nome: '',
    email: '',
    telefone: '',
    estado: '',
    cidade: '',
    linkedin: '',
    foto: ''
  });
  const [objetivo, setObjetivo] = useState('');
  const [formacoes, setFormacoes] = useState([]);
  const [experiencias, setExperiencias] = useState([]);
  const [habilidades, setHabilidades] = useState([]);

  const nextStep = () => setStep(prev => Math.min(prev + 1, 5));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <ResumeContext.Provider value={{
      step, setStep, nextStep, prevStep,
      dadosPessoais, setDadosPessoais,
      objetivo, setObjetivo,
      formacoes, setFormacoes,
      experiencias, setExperiencias,
      habilidades, setHabilidades
    }}>
      {children}
    </ResumeContext.Provider>
  );
};
