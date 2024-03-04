import {
  Box,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import SingUp from "./SingUp";
import SingIn from "./SingIn";
import chakraLogoLight from "../images/chakra-ui-light.png";

function Form() {
  return (
    <Box p={5} w={"100%"} borderRadius={10} boxShadow={"lg"}>
      <Image w={250} mx="auto" mb={6} mt={2} src={chakraLogoLight} />
      <Tabs isFitted>
        <TabList>
          <Tab>登录</Tab>
          <Tab>注册</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SingUp></SingUp>
          </TabPanel>
          <TabPanel>
            <SingIn></SingIn>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
export default Form;
