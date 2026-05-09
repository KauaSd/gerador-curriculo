import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Step4Experience({ onValidate }) {
  const { experiencias, setExperiencias } = useResume();

  const isValid = () => {
    if (experiencias.length === 0) return true;
    return experiencias.every(e => 
      e.empresa.trim() && 
      e.cargo.trim() && 
      e.inicio.trim() && 
      (e.atual || e.fim.trim()) && 
      e.descricao.trim()
    );
  };

  useEffect(() => {
    onValidate(isValid());
  }, [experiencias]);

  const addExperiencia = () => {
    setExperiencias([...experiencias, { id: Date.now(), empresa: '', cargo: '', inicio: '', fim: '', atual: false, descricao: '' }]);
  };

  const removeExperiencia = (id) => {
    setExperiencias(experiencias.filter(e => e.id !== id));
  };

  const updateExperiencia = (id, field, value) => {
    setExperiencias(experiencias.map(e => {
      if (e.id === id) {
        if (field === 'atual') {
          return { ...e, atual: value, fim: value ? '' : e.fim };
        }
        return { ...e, [field]: value };
      }
      return e;
    }));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Experiência Profissional</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Adicione suas experiências relevantes. (Opcional)</p>
      
      <div className="space-y-6">
        {experiencias.map((exp, index) => (
          <div key={exp.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
            <button 
              onClick={() => removeExperiencia(exp.id)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Remover"
            >
              ✕
            </button>
            <h3 className="font-semibold text-gray-700 mb-4">Experiência {index + 1}</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`empresa-${exp.id}`} className="block text-xs font-medium text-gray-600 mb-1">Empresa *</label>
                  <input 
                    id={`empresa-${exp.id}`}
                    type="text" 
                    value={exp.empresa}
                    onChange={(e) => updateExperiencia(exp.id, 'empresa', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Nome da Empresa"
                  />
                </div>
                <div>
                  <label htmlFor={`cargo-${exp.id}`} className="block text-xs font-medium text-gray-600 mb-1">Cargo *</label>
                  <input 
                    id={`cargo-${exp.id}`}
                    type="text" 
                    value={exp.cargo}
                    onChange={(e) => updateExperiencia(exp.id, 'cargo', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Desenvolvedor Frontend"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 items-start">
                <div>
                  <label htmlFor={`inicio-exp-${exp.id}`} className="block text-xs font-medium text-gray-600 mb-1">Início *</label>
                  <input 
                    id={`inicio-exp-${exp.id}`}
                    type="text" 
                    value={exp.inicio}
                    onChange={(e) => updateExperiencia(exp.id, 'inicio', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Jan/2020"
                  />
                </div>
                <div>
                  <label htmlFor={`fim-exp-${exp.id}`} className="block text-xs font-medium text-gray-600 mb-1">Fim *</label>
                  <input 
                    id={`fim-exp-${exp.id}`}
                    type="text" 
                    value={exp.fim}
                    onChange={(e) => updateExperiencia(exp.id, 'fim', e.target.value)}
                    disabled={exp.atual}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500 disabled:bg-gray-200 disabled:text-gray-500"
                    placeholder="Dez/2022"
                  />
                  <div className="mt-2 flex items-center">
                    <input 
                      type="checkbox" 
                      id={`atual-${exp.id}`}
                      checked={exp.atual}
                      onChange={(e) => updateExperiencia(exp.id, 'atual', e.target.checked)}
                      className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={`atual-${exp.id}`} className="text-xs text-gray-600 cursor-pointer">
                      Emprego atual
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor={`descricao-${exp.id}`} className="block text-xs font-medium text-gray-600 mb-1">Descrição das atividades *</label>
                <textarea 
                  id={`descricao-${exp.id}`}
                  value={exp.descricao}
                  onChange={(e) => updateExperiencia(exp.id, 'descricao', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500 min-h-[100px] resize-y"
                  placeholder="Desenvolvimento de novas funcionalidades, manutenção..."
                />
              </div>
            </div>
          </div>
        ))}
        
        {!isValid() && experiencias.length > 0 && (
          <p className="text-red-500 text-sm">Por favor, preencha todos os campos obrigatórios das experiências.</p>
        )}

        <button 
          onClick={addExperiencia}
          className="cursor-pointer w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Adicionar outra experiência
        </button>
      </div>
    </div>
  );
}
