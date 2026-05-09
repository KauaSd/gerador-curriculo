import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Step5Skills({ onValidate }) {
  const { habilidades, setHabilidades } = useResume();
  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);

  const isValid = habilidades.length >= 3;

  useEffect(() => {
    onValidate(isValid);
  }, [habilidades]);

  const handleAdd = () => {
    setTouched(true);
    if (inputValue.trim() !== '') {
      // Prevents duplicates implicitly if using Set, but array is fine if we just check
      if (!habilidades.includes(inputValue.trim())) {
        setHabilidades([...habilidades, inputValue.trim()]);
      }
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const handleRemove = (skillToRemove) => {
    setHabilidades(habilidades.filter(skill => skill !== skillToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Habilidades</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Adicione pelo menos 3 habilidades (soft skills, ferramentas, tecnologias).</p>
      
      <div>
        <div className="flex gap-2 mb-4">
          <label htmlFor="habilidade-input" className="sr-only">Nova Habilidade</label>
          <input 
            id="habilidade-input"
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 p-3 border rounded-lg outline-none focus:ring-1 transition-colors ${
              touched && !isValid ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="Ex: React, Node.js, Liderança..."
          />
          <button 
            onClick={handleAdd}
            className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar
          </button>
        </div>

        {touched && !isValid && (
          <p className="text-red-500 text-sm mb-4">Adicione no mínimo {3 - habilidades.length} habilidade(s) para continuar.</p>
        )}

        <div className="flex flex-wrap gap-2 mt-4 min-h-[60px] p-4 bg-gray-50 border border-gray-200 rounded-lg">
          {habilidades.length === 0 ? (
            <span className="text-gray-400 italic text-sm">Nenhuma habilidade adicionada ainda.</span>
          ) : (
            habilidades.map((skill, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-3 py-1.5 rounded-full text-sm text-gray-700"
              >
                <span>{skill}</span>
                <button 
                  onClick={() => handleRemove(skill)}
                  className="w-5 h-5 flex items-center justify-center bg-gray-100 text-gray-500 hover:text-white hover:bg-red-500 rounded-full transition-colors text-xs font-bold"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
