import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaCheck } from "react-icons/fa";
function SingUp() {
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
        <RadioGroup>
          <Stack direction="row">
            <Radio value="1">男</Radio>
            <Radio value="2">女</Radio>
          </Stack>
        </RadioGroup>
        <Select placeholder="请选择学科">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </Select>
        <Flex alignItems={"center"}>
          <Switch id="deal" mr={2}></Switch>
          <FormLabel htmlFor="deal" mb={0}>
            是否同意协议
          </FormLabel>
        </Flex>
        <Button colorScheme="teal" _hover={{ bg: "tomato" }}>
          注册
        </Button>
      </Stack>
    </form>
  );
}

export default SingUp;
