const FormInvalidField = ({
  form,
  fieldName,
}: {
  form: any;
  fieldName: string;
}) => {
  return (
    <small className={"text-red-500 text-sm font-medium"}>
      {form.touched[fieldName] && form.errors[fieldName]}
    </small>
  );
};
export default FormInvalidField;
