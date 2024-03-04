import { defineStyleConfig } from "@chakra-ui/react";

const CustomButton = defineStyleConfig({
  baseStyle: {
    borderRadius: "lg",
  },
  sizes: {
    sm: {
      px: "3",
      py: "1",
      fontSize: "12px",
    },
    md: {
      px: "6",
      py: "2",
      fontSize: "16px",
    },
  },
  variants: {
    primary: {
      bgColor: "blue.500",
      color: "white",
      _hover: {
        bg: "blue.400",
      },
    },
    danger: {
      bgColor: "red.500",
      color: "white",
      _hover: {
        bg: "red.400",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    size: "sm",
    variant: "primary",
  },
});

export default CustomButton;
