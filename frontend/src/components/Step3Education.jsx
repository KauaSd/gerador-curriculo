import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Step3Education({ onValidate }) {
  const { formacoes, setFormacoes } = useResume();
  const [touched, setTouched] = useState(false);

  // Consider it valid if array is empty (optional) OR if all items are filled
  const isValid = () => {
    if (formacoes.length === 0) return true;
    return formacoes.every(f => f.curso.trim() && f.instituicao.trim() && f.inicio.trim() && f.fim.trim());
  };

  useEffect(() => {
    onValidate(isValid());
  }, [formacoes]);

  const addFormacao = () => {
    setFormacoes([...formacoes, { id: Date.now(), curso: '', instituicao: '', inicio: '', fim: '' }]);
  };

  const removeFormacao = (id) => {
    setFormacoes(formacoes.filter(f => f.id !== id));
  };

  const updateFormacao = (id, field, value) => {
    setFormacoes(formacoes.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Formação Acadêmica</h2>
      <p className="text-gray-500 text-sm text-center mb-6">Adicione seus cursos técnicos, graduações, etc. (Opcional)</p>
      
      <div className="space-y-6">
        {formacoes.map((formacao, index) => (
          <div key={formacao.id} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50">
            <button 
              onClick={() => removeFormacao(formacao.id)}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              title="Remover"
            >
              ✕
            </button>
            <h3 className="font-semibold text-gray-700 mb-4">Formação {index + 1}</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor={`curso-${formacao.id}`} className="block text-xs font-medium text-gray-600 mb-1">Curso *</label>
                <input 
                  id={`curso-${formacao.id}`}
                  type="text" 
                  value={formacao.curso}
                  onChange={(e) => updateFormacao(formacao.id, 'curso', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                  placeholder="Engenharia de Software"
                />
              </div>
              <div>
                <label htmlFor={`instituicao-${formacao.id}`} className="block text-xs font-medium text-gray-600 mb-1">Instituição *</label>
                <input 
                  id={`instituicao-${formacao.id}`}
                  type="text" 
                  value={formacao.instituicao}
                  onChange={(e) => updateFormacao(formacao.id, 'instituicao', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                  placeholder="Universidade Federal"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor={`inicio-${formacao.id}`} className="block text-xs font-medium text-gray-600 mb-1">Início *</label>
                  <input 
                    id={`inicio-${formacao.id}`}
                    type="text" 
                    value={formacao.inicio}
                    onChange={(e) => updateFormacao(formacao.id, 'inicio', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Ex: 2018"
                  />
                </div>
                <div>
                  <label htmlFor={`fim-${formacao.id}`} className="block text-xs font-medium text-gray-600 mb-1">Fim *</label>
                  <input 
                    id={`fim-${formacao.id}`}
                    type="text" 
                    value={formacao.fim}
                    onChange={(e) => updateFormacao(formacao.id, 'fim', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    placeholder="Ex: 2022"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {!isValid() && formacoes.length > 0 && (
          <p className="text-red-500 text-sm">Por favor, preencha todos os campos das formações adicionadas.</p>
        )}

        <button 
          onClick={addFormacao}
          className="cursor-pointer w-full py-3 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 font-medium transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span> Adicionar outra formação
        </button>
      </div>
    </div>
  );
}
