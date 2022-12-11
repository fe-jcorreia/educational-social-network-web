import {
  Select as ChakraSelect,
  InputGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface SelectProps {
  options: string[];
  label?: string;
  placeholder?: string;
  error?: FieldError;
  variant?: "flushed" | "unstyled" | "filled" | "outline";
}

const SelectBase: ForwardRefRenderFunction<HTMLInputElement, SelectProps> = (
  { options, label, placeholder, error, variant = "outline", ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel m="0" fontSize="sm" htmlFor="text">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraSelect
          placeholder={placeholder}
          _hover={{ bgColor: "none" }}
          borderColor="gray.500"
          focusBorderColor="gray.600"
          // @ts-ignore
          ref={ref}
          {...rest}
        >
          <option value=""></option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </ChakraSelect>
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
