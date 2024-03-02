import { chakra, useStyleConfig } from "@chakra-ui/react";

const CustomButtonE = chakra("button");

function CustomButton(props) {
  const { variant, size, ...rest } = props;
  const styles = useStyleConfig("CustomButton", { variant, size });
  return <CustomButtonE __css={styles} {...rest} />;
}

export default CustomButton;
