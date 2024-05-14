import { Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import {
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { API } from "../../API/api";

function Signup() {
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const Signupbtn = () => {
    navigate("/login");
  };

  const handleRole = (e) => {
    setRole(e);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const payload = {
      username,
      email,
      password,
      role,
    };

    fetch(`${API}/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        toast({
          title: "Account created successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Failed to create account",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      })
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
                required
                type="text"
                placeholder="username"
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }
                border={"none"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Text mt={"20px"} fontSize={"15px"} fontWeight={"600"}>
                Signup As:
              </Text>
              <RadioGroup onChange={handleRole} value={role}>
                <Stack direction="column">
                  <Radio value="artist">
                    Creator (Individual: Artist or Artisans)
                  </Radio>
                  <Radio pb={4} value="collector">
                    Explorer
                  </Radio>
                </Stack>
              </RadioGroup>

              <FormLabel>Enter Email address</FormLabel>
              <Input
                required
                type="text"
                placeholder="email"
                value={email}
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }
                border={"none"}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormLabel pt={4}>Enter Password</FormLabel>
              <InputGroup>
                <Input
                  required
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

              <FormLabel pt={4}>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  value={confirmPassword}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  border={"none"}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowConfirmPassword((showConfirmPassword) =>
                        !showConfirmPassword
                      )
                    }
                  >
                    {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>

              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                ></Stack>
                <Button
                  _hover={{ bg: "white", color: "#B79B54" }}
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
                  _hover={{ bg: "#B79B54", color: "white" }}
                  variant={"solid"}
                  border={"2px solid #B79B54"}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  color={"#B79B54"}
                  background={"white"}
                  borderRadius={"20px"}
                  onClick={Signupbtn}
                  type="button"
                  _loading={"please wait.."}
                >
                  Sign in
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Flex>
        <Flex flex={1}></Flex>
      </Stack>
    </>
  );
}

export default Signup;
