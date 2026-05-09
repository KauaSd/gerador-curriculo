import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Step2Objective({ onValidate }) {
  const { objetivo, setObjetivo } = useResume();
  const [touched, setTouched] = useState(false);

  const error = touched && objetivo.trim().length < 20 
    ? 'O objetivo deve ter pelo menos 20 caracteres.' 
    : null;

  useEffect(() => {
    onValidate(objetivo.trim().length >= 20);
  }, [objetivo]);

  const getInputClass = () => {
    const base = "w-full p-4 border rounded-lg outline-none transition-colors min-h-[150px] resize-y ";
    if (!touched) return base + "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    if (error) return base + "border-red-500 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500";
    return base + "border-green-500 bg-green-50 focus:border-green-500 focus:ring-1 focus:ring-green-500";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Objetivo Profissional</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Descreva brevemente sua área de atuação e onde deseja chegar (min. 20 caracteres).</p>
      
      <div>
        <label htmlFor="objetivo" className="sr-only">Objetivo Profissional</label>
        <textarea 
          id="objetivo"
          value={objetivo}
          onChange={(e) => setObjetivo(e.target.value)}
          onBlur={() => setTouched(true)}
          className={getInputClass()}
          placeholder="Sou um profissional apaixonado por tecnologia..."
        />
        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        <p className="text-gray-400 text-xs mt-2 text-right">{objetivo.length} caracteres</p>
      </div>
    </div>
  );
}
