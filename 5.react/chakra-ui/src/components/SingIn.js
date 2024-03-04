import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";
function SingIn() {
  return (
    <form>
      <Stack spacing={5}>
        <FormControl isInvalid>
          <InputGroup>
            <InputLeftAddon children={<FaUserAlt />}></InputLeftAddon>
            <Input placeholder="请输入用户名"></Input>
          </InputGroup>
          <FormHelperText>用户名是必填项</FormHelperText>
        </FormControl>

        <InputGroup>
          <InputLeftAddon children={<FaLock />}></InputLeftAddon>

          <Input placeholder="请输入密码" type="password"></Input>
          <InputRightAddon children={<FaCheck />}></InputRightAddon>
        </InputGroup>

        <Button colorScheme="teal" _hover={{ bg: "tomato" }}>
          登录
        </Button>
      </Stack>
    </form>
  );
}

export default SingIn;
