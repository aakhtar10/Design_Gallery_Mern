import { Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const Signupbtn = () => {
    navigate("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const payload = {
      username,
      email,
      password,
    };

    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Stack
        minH={"100vh"}

        direction={{ base: "column", md: "row" }}
        backgroundImage="url('https://images.unsplash.com/photo-1578926375605-eaf7559b1458?q=80&w=1963&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
        backgroundSize="cover"
        backgroundPosition="center"
        display="flex"
        alignItems="center"
        justifyContent="center"

      >
        <Flex p={1} flex={1.5} align={"center"} gap={"20px"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontSize={["2xl", "3xl", "4xl"]} color={"#B79B54"}>
              Sign up to your account
            </Heading>
            <Box as="form" onSubmit={handleRegister}>
              <FormLabel>Enter Your Name</FormLabel>
              <Input
                type="text"
                placeholder="username"
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }
                border={"none"}

                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

              <FormLabel>Enter Email address</FormLabel>
              <Input
                type="text"
                placeholder="email"
                value={email}
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }
                border={"none"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel> Enter Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  value={password}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  border={"none"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                </Stack>
                <Button
                  backgroundColor={"#B79B54"}
                  variant={"solid"}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  type="submit"
                  color={"white"}
                  borderRadius={"20px"}
                >
                  Sign Up
                </Button>
                <Button
                  variant={"solid"}
                  border={"2px solid #B79B54"}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  color={"#B79B54"}
                  background={"white"}
                  borderRadius={"20px"}
                  onClick={Signupbtn}
                  type="button" // Changed to type="button"
                >
                  Sign in
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <Flex flex={1}>

        </Flex>
      </Stack>
    </>
  );
}

export default Signup;
