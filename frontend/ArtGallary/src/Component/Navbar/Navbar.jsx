import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Menu,
  MenuButton,
  MenuList,
  Center,
  MenuDivider,
  MenuItem,
  InputGroup,
  InputRightElement,
  Input,
  Image,
  
  Text,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../../pages/Logout/Logout";

const Links = [
  { ids: 1, name: "PAINTING", link: "/art/paintings" },
  { ids: 2, name: "PRINTS", link: "/art/prints" },
  { ids: 3, name: "PHOTOGRAPHY", link: "/art/photography" },
  { ids: 4, name: "SCULPTURE", link: "/art/sculpture" },
  { ids: 5, name: "DRAWINGS", link: "/art/drawings" },
  { ids: 6, name: "INSPIRATION", link: "/art/inspiration" },
  // { ids: 7, name: "ABOUT", link: "/about" },
];

export default function NavBar( ) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const username = localStorage.getItem("username");
  const navigate = useNavigate();
  const initials = username ? username.charAt(0).toUpperCase() : "";

  
  return (
    <>
      <Box bg={"rgb(250,248,244)"}>
        <HStack
          spacing={10}
          display={["flex", "flex", "flex", "flex", "flex", "flex"]}
          justifyContent={"space-around"}
          alignItems={"center"}
          fontSize={["xs", "xs", "xs", "sm", "sm", "md"]}
          pl={[0, 0, 0, 40]}
          pr={[0, 0, 0, 40]}
          pt={1}
          pb={1}
        >
          <Menu>
            <Link to={"/home"}>
              <Image
                h={20}
                w={20}
                src="https://theartling.com/build/_assets/TheArtlingLogo-BZIAGPLW.svg"
                alt="logo"
                pl={[3, 0, 0]}
              />
            </Link>
            <Center width={["55%"]}>
              <InputGroup border={"none"}>
                <InputRightElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputRightElement>
                <Input
                  bg={"white"}
                  border={"none"}
                  variant="unstyled"
                  type="text"
                  placeholder="Search for artworks"
                />
              </InputGroup>
            </Center>
            <Link to={`/cart`}>
              <Image
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAaVBMVEX///8DAQQAAAD7+/uLi4sLCwszMzTa2trz8/P39/fi4uK5ubmwsLCdnZ3Hx8fNzc1VVVWFhYVLS0vp6eldXV3U1NR3d3d/f38XFheVlZUkIyRQUFA4ODgsLCxvb29lZWWlpaVEREQdHR1uxI0+AAAEBUlEQVRogdVZ2ZaqMBDEoIKA4oqiOC7//5EXBoZ0muosszzcevEckxRN72mi6K9xSLLDH1HnF/WJ4zr5de665Z319Opep7/KXbbUI1r++jfJPwj3J/3VoZz4VNTzovR6xYVJ3tFvLNtX58FCs4eHD0zIW/ZS3n770qJSbzf5cULenpOF0hZSC7dm8in5TDU+5Cpzi/5QQPZC2JxS1zq5yaP54OSUfBHjvRkltxlei1Pm+bq6Gw4viF7SPbkP+YDkpU+qLd6zoeTrAPIoqoi1sCtQ86t5EHm01Oz4nQtKXoWRa8HUDm5YU/KPMPJ4NKrg6nNK/ggj1/GqFFw/U3LB6CJ2mhwmR5pD1SuQPHdYdEvJ74HkiSaHjnaj5FIYS1hdRr1Aje6NsrUKFL0Zya/66OF4X/Ywsr8a/lzuPfJjB+0OJKl/qBEzivHfpR95gSz6ADnfeMjVjxxaNAEp3yD3zY86Rvf6z7WV3D/JvGCM7i3s6u7tksSixAdWb5EdlnPhcdCiFrUroPBi27x2qCBIMVpI5JP+L256/wTdT6pj9GYs7CA7yLtDZoXqeqEY7YC8XTUT7Z7G8yA7YYsaj9Xci2l6GXMbilvBoi1S7jKo6dI2m4F6Y8m6qeky0Ga696RROEKvTrJuYt4UQMtFdsC+poExOj0LMwoRHLY+skWjruUaH/0EZ6nGYXMiW7RDPrDjZo4KDpt83cnCh/fsmPtEtIZTZTrWMtw85Eq89G1dgpP8qt6wBG8WUN9Ggy3meKtFO6yE21BDBJdqtqszkpB7CE5jFPe6ApZujUe0jt7EPVM8XT7ewxajMpSX4KQu+Nw1B5DW3XqhITEqXUgnyKjgtibSEaMQ5Jpvv+atdIx6doH0Dqmu9j5GlypPpcdXQu5Q5dyVf+QDtqlEjw0xjs8Nn1Yo27Smh6vgMFx9An9ERXaro0sWY7d7xJOxmd2+2s1FVHTv0/2ebGin7CAbve6mB8dlAsPXc9Hsy03uo5QOuKu1c/tn6GB2n2HgiDpM78prXDeivATQe0UbRVxPbs2/xt1i9WwcTj7g4kwpEFl+PjbvhRVNHTrBoIjt+AHz/4r0VBQbSyNyKIui/N6noEPVe8NN8Ibs2K8//DucEfng5+0PLDG1Xg+bG0dde0SKDBiv0gwROjg2ZxVT2Yy87FfLNfasHvFIMa/UYVPMjKUVXgs2fD1E9Cc/zK7UZ75+DiCv+GHWTPExhjoGkPMJC5/A3Pk6GiVImLw2k5zP7IIk53MtfnjO10M8PeWzW9Ycnzh5UBGtmJ/zddOiQSpnooMIZMOdwNxlDG9AZsoDe20T2VJ9fQCHt5Hy/aMKXXyW/5n0XT1+Xrv19/ObFTpOEmufljrW/wb/AAtmKNAp48JkAAAAAElFTkSuQmCC"
                h={8}
                w={8}
              />
            </Link>
            <MenuButton>
              <Text
                h={9}
                w={9}
                pr={[3, 0, 0]}
                fontSize={"22px"}
                color={"rgb(183,155,84)"}
                fontWeight={"600"}
                borderRadius={"50%"}
                border={"3px solid rgb(183,155,84)"}
                bg={"rgb(230,228,224)"}
                name={username}
              >
                {initials}
              </Text>
            </MenuButton>

            <MenuList bg={"rgb(250,248,244)"}>
              <Center>
                <Text align={"flex-start"} fontSize={16} fontWeight={700}>
                  {username}
                </Text>
              </Center>
              <MenuDivider />
              <MenuItem
                onClick={() => {
                  navigate("/art-portfolio");
                }}
                _hover={{ bg: "#f5f1ee" }}
                bg={"rgb(250,248,244)"}
              >
                Your Profile
              </MenuItem>
              <MenuItem _hover={{ bg: "#f5f1ee" }} bg={"rgb(250,248,244)"}>
                Account Settings
              </MenuItem>
              <MenuItem _hover={{ bg: "#f5f1ee" }} bg={"rgb(250,248,244)"}>
                <Flex  flexDir={"row"}
                  _hover={{ bg: "#f5f1ee" }}
                  bg={"rgb(250,248,244)"}
                  width={"100%"}
                  // pr={24}
                >
                  <Image
                    h={8}
                    w={8}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGOVXjlJMidDtZrU0mrXlHzHdFE9_gVlvCGw&s"
                  />{" "}
                  
                  <LogoutButton />
                </Flex>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Box>
      <Box width={"100%"} borderBottom="1px solid #D9D1C2"></Box>
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

          <HStack
            spacing={10}
            alignItems={"center"}
            fontSize={["xs", "xs", "xs", "sm", "sm", "md"]}
          >
            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
              justify={"flex-end"}
              pl={[0, 0, 36, 52, 72,72]}
              pr={[0, 0, 36, 52, 72,72]}
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
    </>
  );
}
