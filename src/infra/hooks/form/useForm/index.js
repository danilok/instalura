import React from 'react';

function formatErrors(yupErrorsInner = []) {
  return yupErrorsInner.reduce((errorObjectAcc, currentError) => {
    const fieldName = currentError.path;
    const errorMessage = currentError.message;
    return {
      ...errorObjectAcc,
      [fieldName]: errorMessage,
    };
  }, {});
}

export default function useForm({
  initialValues,
  onSubmit,
  validateSchema,
}) {
  const [values, setValues] = React.useState(initialValues);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState(initialValues);
  const [touchedFields, setTouchedFields] = React.useState({
    usuario: false,
    senha: false,
  });

  async function validate(currentValues) {
    try {
      await validateSchema(currentValues);
      setIsFormDisabled(false);
      setErrors({});
    } catch (err) {
      const formattedErrors = formatErrors(err.inner);
      setErrors(formattedErrors);
      setIsFormDisabled(true);
    }
  }

  React.useEffect(async () => {
    validate(values);
  }, [values]);

  return {
    values,
    handleSubmit(event) {
      event.preventDefault();
      setIsFormSubmitted(true);
      onSubmit(values);
    },
    handleChange(event) {
      setIsFormSubmitted(false);
      const fieldName = event.target.getAttribute('name');
      const { value } = event.target;
      setValues((currentValues) => ({
        ...currentValues,
        [fieldName]: value,
      }));
    },
    // Validação do Form
    isFormDisabled,
    setIsFormDisabled,
    isFormSubmitted,
    errors,
    touchedFields,
    handleBlur(event) {
      const fieldName = event.target.getAttribute('name');
      setTouchedFields({
        ...touchedFields,
        [fieldName]: true,
      });
    },
  };
}
