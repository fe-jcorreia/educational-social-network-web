import {
  Textarea as ChakraTextArea,
  InputGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  type?: string;
  height?: string;
  label?: string;
  placeholder?: string;
  error?: FieldError;
  value?: string;
  variant?: "flushed" | "unstyled" | "filled" | "outline";
}

const TextAreaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  InputProps
> = (
  { label, placeholder, error, value, height, variant = "outline", ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel m="0" fontSize="sm">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        <ChakraTextArea
          height={height}
          defaultValue={value}
          variant={variant}
          placeholder={placeholder}
          _hover={{ bgColor: "none" }}
          borderColor="gray.500"
          focusBorderColor="gray.600"
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const TextArea = forwardRef(TextAreaBase);
