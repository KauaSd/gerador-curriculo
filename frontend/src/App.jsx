import { useState } from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import ProgressBar from './components/ProgressBar';
import Step1Personal from './components/Step1Personal';
import Step2Objective from './components/Step2Objective';
import Step3Education from './components/Step3Education';
import Step4Experience from './components/Step4Experience';
import Step5Skills from './components/Step5Skills';
import './index.css';

import { t } from './i18n/strings';

function MainApp() {
  const { step, nextStep, prevStep, dadosPessoais, objetivo, formacoes, experiencias, habilidades } = useResume();
  const [isStepValid, setIsStepValid] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    try {
      const payload = {
        dadosPessoais,
        objetivo,
        formacoes,
        experiencias,
        habilidades
      };

      const response = await fetch('http://localhost:3001/api/curriculo/gerar-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(t('errorGenerating'));
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Curriculo_${dadosPessoais.nome.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error('Erro:', error);
      alert(t('errorGenerating'));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 font-medium"
      >
        {t('skipToContent')}
      </a>
      
      <main id="main-content" className="max-w-4xl mx-auto">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">{t('appTitle')}</h1>
          <p className="mt-3 text-lg text-gray-500">{t('appSubtitle')}</p>
        </div>

        <ProgressBar />

        <div className="mt-8">
          {step === 1 && <Step1Personal onValidate={setIsStepValid} />}
          {step === 2 && <Step2Objective onValidate={setIsStepValid} />}
          {step === 3 && <Step3Education onValidate={setIsStepValid} />}
          {step === 4 && <Step4Experience onValidate={setIsStepValid} />}
          {step === 5 && <Step5Skills onValidate={setIsStepValid} />}
        </div>

        <div className="max-w-2xl mx-auto mt-8 flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 1 || isGenerating}
            className="cursor-pointer px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t('back')}
          </button>
          
          {step < 5 ? (
            <button
              onClick={nextStep}
              disabled={!isStepValid}
              className="cursor-pointer px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {t('nextStep')}
            </button>
          ) : (
            <button
              onClick={handleGeneratePDF}
              disabled={!isStepValid || isGenerating}
              className="cursor-pointer px-8 py-3 border border-transparent shadow-md text-base font-bold rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('generating')}
                </>
              ) : (
                t('generatePdf')
              )}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ResumeProvider>
      <MainApp />
    </ResumeProvider>
  );
}

export default App;
