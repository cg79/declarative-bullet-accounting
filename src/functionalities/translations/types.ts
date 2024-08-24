export type IUseTranslations = {
  translate: (key: string) => string;
  translateList: (key: string) => string[];
  translateListByKey: (key: string) => string[];
};

export type ITranslations = {
  key: string;
  value: string;
};

export const getDefaultTranslation = (): ITranslations => {
  return {
    key: '',
    value: '',
  };
};
