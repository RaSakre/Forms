interface IValidationRules {
  required: (value: any) => string | boolean;
  minLength: (length: number) => (value: any) => string | boolean;
  maxLength: (length: number) => (value: any) => string | boolean;
  sameAs: (field: string) => (value: any, model: any) => string | boolean;
  email: (value: any) => string | boolean;
}

export const Validators: IValidationRules = {
  required: (value: any) => {
    if (!value) return 'Обязательное поле';
    return true;
  },
  minLength: (length: number) => {
    return (value: any) => {
      if (value.length < length) return `Минимальная длина ${length} символов`;
      return true;
    };
  },
  maxLength: (length: number) => {
    return (value: any) => {
      if (value.length > length) return `Максимальная длина ${length} символов`;
      return true;
    };
  },
  sameAs: (field: string) => {
    return (value: any, model: any) => {
      if (value !== model[field]) return 'Значения не совпадают';
      return true;
    };
  },
  email: (value: any) => {
    if (!value.includes('@')) return 'Неверный email';
    return true;
  },
};
