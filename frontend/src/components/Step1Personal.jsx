import { useState, useEffect } from 'react';
import { useResume } from '../context/ResumeContext';

export default function Step1Personal({ onValidate }) {
  const { dadosPessoais, setDadosPessoais } = useResume();
  
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    telefone: false,
    estado: false,
    cidade: false,
    linkedin: false
  });

  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingCidades, setLoadingCidades] = useState(false);

  useEffect(() => {
    const fetchEstados = async () => {
      setLoadingEstados(true);
      try {
        const res = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome');
        const data = await res.json();
        setEstados(data);
      } catch (err) {
        console.error("Erro ao carregar estados", err);
      } finally {
        setLoadingEstados(false);
      }
    };
    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchCidades = async () => {
      if (!dadosPessoais.estado) {
        setCidades([]);
        return;
      }
      setLoadingCidades(true);
      try {
        const res = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${dadosPessoais.estado}/municipios?orderBy=nome`);
        const data = await res.json();
        setCidades(data);
      } catch (err) {
        console.error("Erro ao carregar cidades", err);
      } finally {
        setLoadingCidades(false);
      }
    };
    fetchCidades();
  }, [dadosPessoais.estado]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const getError = (field, value) => {
    if (!touched[field]) return null;
    if (field === 'linkedin') return null; // opcional
    if (!value || value.trim() === '') return 'Este campo é obrigatório';
    if (field === 'email' && !validateEmail(value)) return 'Formato de e-mail inválido';
    if (field === 'telefone' && value.replace(/[^0-9]/g, '').length < 10) return 'Telefone inválido';
    return null;
  };

  const isValid = () => {
    return (
      dadosPessoais.nome.trim() !== '' &&
      dadosPessoais.email.trim() !== '' &&
      validateEmail(dadosPessoais.email) &&
      dadosPessoais.telefone.replace(/[^0-9]/g, '').length >= 10 &&
      dadosPessoais.estado.trim() !== '' &&
      dadosPessoais.cidade.trim() !== ''
    );
  };

  useEffect(() => {
    onValidate(isValid());
  }, [dadosPessoais]);

  const handleChange = (field, value) => {
    setDadosPessoais(prev => ({ ...prev, [field]: value }));
  };

  const handlePhoneChange = (val) => {
    let raw = val.replace(/\D/g, ''); // remove non-digits
    raw = raw.substring(0, 11); // max 11 digits
    let formatted = raw;
    if (raw.length > 2) {
      formatted = `(${raw.substring(0, 2)}) `;
      if (raw.length > 6) {
        formatted += `${raw.substring(2, 7)}-${raw.substring(7)}`;
      } else {
        formatted += raw.substring(2);
      }
    }
    handleChange('telefone', formatted);
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('A foto deve ter no máximo 2MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleChange('foto', reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getInputClass = (field, value) => {
    const error = getError(field, value);
    const base = "w-full p-3 border rounded-lg outline-none transition-colors ";
    if (!touched[field]) return base + "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    if (error) return base + "border-red-500 bg-red-50 focus:border-red-500 focus:ring-1 focus:ring-red-500";
    
    // Fix for linkedin turning green when empty
    if (field === 'linkedin' && (!value || value.trim() === '')) {
      return base + "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500";
    }

    return base + "border-green-500 bg-green-50 focus:border-green-500 focus:ring-1 focus:ring-green-500";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Dados Pessoais</h2>
      
      <div className="space-y-5">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-2">
            {dadosPessoais.foto ? (
              <img src={dadosPessoais.foto} alt="Foto de Perfil" className="w-24 h-24 rounded-full object-cover border-2 border-blue-500" />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                <span>Foto</span>
              </div>
            )}
            <label htmlFor="foto" className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1.5 cursor-pointer hover:bg-blue-700 transition-colors shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </label>
            <input 
              id="foto"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
          <p className="text-xs text-gray-500">Tamanho máximo: 2MB (Opcional)</p>
        </div>

        <div>
          <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
          <input 
            id="nome"
            type="text" 
            value={dadosPessoais.nome}
            onChange={(e) => handleChange('nome', e.target.value)}
            onBlur={() => handleBlur('nome')}
            className={getInputClass('nome', dadosPessoais.nome)}
            placeholder="João da Silva"
          />
          {getError('nome', dadosPessoais.nome) && <p className="text-red-500 text-xs mt-1">{getError('nome', dadosPessoais.nome)}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input 
              id="email"
              type="email" 
              value={dadosPessoais.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className={getInputClass('email', dadosPessoais.email)}
              placeholder="joao@email.com"
            />
            {getError('email', dadosPessoais.email) && <p className="text-red-500 text-xs mt-1">{getError('email', dadosPessoais.email)}</p>}
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
            <input 
              id="telefone"
              type="tel" 
              value={dadosPessoais.telefone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              onBlur={() => handleBlur('telefone')}
              className={getInputClass('telefone', dadosPessoais.telefone)}
              placeholder="(11) 99999-9999"
              maxLength="15"
            />
            {getError('telefone', dadosPessoais.telefone) && <p className="text-red-500 text-xs mt-1">{getError('telefone', dadosPessoais.telefone)}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
            <select
              id="estado"
              value={dadosPessoais.estado}
              onChange={(e) => {
                handleChange('estado', e.target.value);
                handleChange('cidade', ''); // reset city when state changes
              }}
              onBlur={() => handleBlur('estado')}
              className={getInputClass('estado', dadosPessoais.estado) + " cursor-pointer"}
              disabled={loadingEstados}
            >
              <option value="">{loadingEstados ? 'Carregando...' : 'Selecione o Estado'}</option>
              {estados.map(est => (
                <option key={est.id} value={est.sigla}>{est.nome}</option>
              ))}
            </select>
            {getError('estado', dadosPessoais.estado) && <p className="text-red-500 text-xs mt-1">{getError('estado', dadosPessoais.estado)}</p>}
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
            <select
              id="cidade"
              value={dadosPessoais.cidade}
              onChange={(e) => handleChange('cidade', e.target.value)}
              onBlur={() => handleBlur('cidade')}
              className={getInputClass('cidade', dadosPessoais.cidade) + " cursor-pointer"}
              disabled={loadingCidades || !dadosPessoais.estado}
            >
              <option value="">
                {!dadosPessoais.estado ? 'Selecione o estado primeiro' : (loadingCidades ? 'Carregando...' : 'Selecione a Cidade')}
              </option>
              {cidades.map(cid => (
                <option key={cid.id} value={cid.nome}>{cid.nome}</option>
              ))}
            </select>
            {getError('cidade', dadosPessoais.cidade) && <p className="text-red-500 text-xs mt-1">{getError('cidade', dadosPessoais.cidade)}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn / Portfólio (Opcional)</label>
          <input 
            id="linkedin"
            type="url" 
            value={dadosPessoais.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            onBlur={() => handleBlur('linkedin')}
            className={getInputClass('linkedin', dadosPessoais.linkedin)}
            placeholder="https://linkedin.com/in/joao"
          />
        </div>
      </div>
    </div>
  );
}
