import { useState } from 'react';
import TR from './default-translations';
import TR_ro from './translations_ro';

const useTranslations = () => {
  const [currentTranslation, setCurrentTranslation] = useState<any>(TR);

  const changeTranslation = (language: string) => {
    if (language === 'ro') {
      setCurrentTranslation(TR_ro);
      return;
    }
    if (language === 'en') {
      setCurrentTranslation(TR);
      return;
    }
  };

  return {
    currentTranslation,
    changeTranslation,
  };
};
export default useTranslations;
