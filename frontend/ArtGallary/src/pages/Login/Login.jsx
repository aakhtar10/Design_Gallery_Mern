import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Flex,
  Box,
  FormLabel,
  Input,
  Stack,
  Heading,
  Button,
  InputGroup,
  InputRightElement,
  Spinner // Import Spinner component
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { API } from "../../API/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when login process starts
    const payload = {
      email,
      password,
    };

    fetch(`${API}/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false); // Set loading to false when login process completes
        if (data.token) {
          toast({
            title: "Logged in successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          localStorage.setItem("token", data.token);
          localStorage.setItem("username", data.username);
          navigate("/home");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((err) => {
        setIsLoading(false); // Set loading to false if login process encounters an error
        console.log(err);
      });
  };

  return (
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
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"40px"} color={"#B79B54"}>
            Sign in to your account
          </Heading>
          <Box as="form" onSubmit={handleLogin} flex={1} gap={"20px"}>
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
            <FormLabel mt={"10px"}> Enter Password</FormLabel>
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
              ></Stack>
              <Button
                _hover={{ bg: "white", color: "#B79B54" }}
                variant={"solid"}
                border={"2px solid #B79B54"}
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                }
                color={"white"}
                background={"#B79B54"}
                borderRadius={"20px"}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Sign in"
                )}
              </Button>
              <Link to="/signup">
                <Button
                  _hover={{ bg: "white", color: "#B79B54" }}
                  width={["100%", "100%"]}
                  variant={"solid"}
                  border={"2px solid #B79B54"}
                  boxShadow={
                    "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                  }
                  color={"white"}
                  background={"#B79B54"}
                  borderRadius={"20px"}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Flex>
      <Flex flex={1}></Flex>
    </Stack>
  );
}

export default Login;
