import {
  Input as ChakraInput,
  Icon,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { IconType } from "react-icons";
import { FieldError } from "react-hook-form";

interface InputProps {
  type?: string;
  label?: string;
  icon?: IconType;
  placeholder?: string;
  error?: FieldError;
  value?: string;
  variant?: "flushed" | "unstyled" | "filled" | "outline";
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    type = "text",
    label,
    icon,
    placeholder,
    error,
    value,
    variant = "outline",
    ...rest
  },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel m="0" fontSize="sm" htmlFor={type}>
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {icon && (
          <InputLeftElement pointerEvents="none">
            <Icon as={icon} color="gray.500" />
          </InputLeftElement>
        )}
        <ChakraInput
          type={type}
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

export const Input = forwardRef(InputBase);
