import { useResume } from '../context/ResumeContext';
import { t } from '../i18n/strings';

export default function ProgressBar() {
  const { step } = useResume();
  const steps = [
    t('steps.personal'),
    t('steps.objective'),
    t('steps.education'),
    t('steps.experience'),
    t('steps.skills')
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-4">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-10 rounded"></div>
        <div 
          className="absolute top-4 left-0 h-1 bg-blue-600 -z-10 rounded transition-all duration-300"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        ></div>

        {steps.map((label, index) => {
          const isCompleted = step > index + 1;
          const isCurrent = step === index + 1;
          
          return (
            <div key={label} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-300 ${
                  isCompleted 
                    ? 'bg-blue-600 text-white' 
                    : isCurrent 
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100' 
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className={`mt-2 text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500 hidden sm:block'}`}>
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
