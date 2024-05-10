import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  
} from "@chakra-ui/react";
 import "./ArtGallaryLogo.png";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Links = [
  { ids: 1, name: "PAINTING", link: "/paintings" },
  { ids: 2, name: "PRINTS", link: "/prints" },
  { ids: 3, name: "PHOTOGRAPHY", link: "/photography" },
  { ids: 4, name: "SCULPTURE", link: "/sculpture" },
  { ids: 5, name: "DRAWINGS", link: "/drawings" },
  { ids: 6, name: "INSPIRATION", link: "/inspiration" },
  { ids: 7, name: "ABOUT", link: "/about" },
];

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box>

      </Box>
      <Box bg="rgb(250,248,244)" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            bg={"none"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <Box>
            <img src="./ArtGallaryLogo.png" alt="logo" />
            </Box>
          <HStack
            spacing={10}
            alignItems={"center"}
            fontSize={["xs", "xs", "xs", "sm", "sm", "md"]}
          >
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((el) => (
                <Link to={el.link} key={el.ids}>
                  {el.name}{" "}
                </Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}></Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack
              as={"nav"}
              spacing={4}
              fontSize={["xs", "sm", "sm", "sm", "md", "lg"]}
            >
              {Links.map((el) => (
                <Link to={el.link} key={el.ids}>
                  {el.name}{" "}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>Main Content Here</Box>
    </>
  );
}
