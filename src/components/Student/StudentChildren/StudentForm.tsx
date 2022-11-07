import { Alert, Box, Button, CircularProgress } from "@mui/material";
import { Student } from "../../../models";
import { useAppSelector } from "../../../redux/hooks";
import { selectCityOptions } from "../../city/citySlice";
import { InputField } from "../FormField/InputField";
import { RadioGroupField } from "../FormField/RadioGroupField";
import { SelectCityField } from "../FormField/SelectCityField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

export interface StudentFormProps {
  initialValues?: Student;
  onSubmit?: (formValues: Student) => void;
}

const schema = yup
  .object({
    name: yup
      .string()
      .required("Please enter name")
      .test("two-words", "Please enter at least two words", (value) => {
        if (!value) return true;
        const parts = value?.split(" ") || [];
        return parts.filter((x) => !!x)?.length >= 2;
      }),
    gender: yup
      .string()
      .oneOf(["male", "female"], "Please select either male or female")
      .required("Please select gender"),
    age: yup
      .number()
      .positive("Please enter a positive number")
      .integer("Please enter an interger")
      .min(18, "Min is 18")
      .max(60, "Max is 60")
      .required("Please enter age")
      .typeError("Please enter a valid number"),
    mark: yup
      .number()
      .positive("Please enter a positive number")
      .min(0, "Min is 0")
      .max(10, "Max is 10")
      .required("Please enter mark")
      .typeError("Please enter a valid number"),
    city: yup.string().required("Please select city"),
  })
  .required();

export default function StudentForm({ initialValues, onSubmit }: StudentFormProps) {
  const cityOptions = useAppSelector(selectCityOptions);
  const [error, setError] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Student>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = async (formValues: Student) => {
    try {
      setError("");
      await onSubmit?.(formValues);
    } catch (err: any) {
      setError(err.massage);
    }
  };

  return (
    <>
      <Box maxWidth={400}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Form fields */}
          <InputField name="name" control={control} label="Full Name" />
          <RadioGroupField
            name="gender"
            control={control}
            label="Gender"
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
          />
          <InputField name="age" control={control} label="Age" type="number" />
          <InputField name="mark" control={control} label="Mark" type="number" />
          {Array.isArray(cityOptions) && cityOptions.length > 0 && (
            <SelectCityField name="city" control={control} label="City" options={cityOptions} />
          )}
          {error && <Alert severity="error">{error}</Alert>}
          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              {isSubmitting && <CircularProgress size={14} color="primary" />}
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
