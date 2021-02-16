import { useState } from "react";

let useForm = ({ initialValues }) => {
  const [fields, setFields] = useState(initialValues);
  const addField = (name, value) => {
    setFields({ ...fields, [name]: value });
  };
  const removeField = (name) => {
    const filtered = fields.filter((x) => x !== name);
    setFields(filtered);
  };
  function filter(exceptions = []) {
    let vec = [];
    for (let i in fields) {
      if (fields[i] === "" && !exceptions.includes(i)) {
        vec.push(i);
      }
    }
    return vec;
  }
  return {
    fields,
    addField,
    removeField,
    getInput: (name) => ({
      name,
      onChange: (text) => {
        setFields({ ...fields, [name]: text.target.value });
      }
     
    }),
    getPicker: (name) => ({
      name,
      onValueChange: (value) => {
        setFields({ ...fields, [name]: value });
      },
    }),
    setForm: (name, value) => {
      setFields({ ...fields, [name]: value });
    },
    ValidateForm: (exceptions = []) => {
      return filter(exceptions).length === 0;
    },
  };
};

export default useForm;
