import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import {
  Box,
  Text,
  Stack,
  Image,
  Grid,
  Flex,
  Skeleton,
  Button,
  Badge,
  useColorModeValue,
  Center,
  Avatar,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormLabel,
  Input,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import AOS from "aos";

import "aos/dist/aos.css";
import { API } from "../../API/api";
AOS.init();
const ArtPortfolio = () => {
  const toast = useToast();
  const [arts, setArts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(16);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [username, setUsername] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [artName, setName] = useState("");
  const [artPrice, setPrice] = useState(0);
  const [artId, setArtId] = useState(null);
  const [artNamePost, setArtName] = useState("");
  const [artPricePost, setArtPrice] = useState("");
  const [artCategory, setArtCategory] = useState("");
  const [artDimension, setArtDimension] = useState("");
  const [artImage, setSelectedFiles] = useState([]);
  const [created_at, setCreatedAt] = useState(0);
  const [role, setRole] = useState();
  const [show, setShow] = useState(false);
  const handleArtNameChange = (e) => {
    setArtName(e.target.value);
    console.log(artNamePost);
  };

  const handleCreatedAtChange = (e) => {
    setCreatedAt(e.target.value);
    console.log(created_at);
  };
  const handleArtPriceChange = (e) => {
    setArtPrice(e.target.value);
    console.log(artPricePost);
  };

  const handleArtCategoryChange = (e) => {
    setArtCategory(e.target.value);
    console.log(artCategory);
  };

  const handleArtDimensionChange = (e) => {
    setArtDimension(e.target.value);
    console.log(artDimension);
  };

  const handleFileChange = (e) => {
    console.log(e);
    console.log(e.target.files[0]);
    setSelectedFiles(e.target.files[0]);
  };

  const handleSubmitPostForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/artist/add`,
        {
          artImage: artImage,
          artName: artNamePost,
          artPrice: artPricePost,
          created_at: created_at,
          artCategory: artCategory,
          artDimension: artDimension,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      toast({
        title: "Art added successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleModalOpen = (id, name, price) => {
    onOpen();
    setName(name);
    setPrice(price);
    setArtId(id);
  };

  useEffect(() => {
    axios
      .get(`${API}/artist/artPortfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.getArt[0].username);
        setRole(response.data.role);

        let sortedArts = response.data.getArt;
        if (sortBy === "Newest") {
          sortedArts = sortedArts.sort((a, b) => a.created_at - b.created_at);
        } else if (sortBy === "Low to High") {
          sortedArts = sortedArts.sort((a, b) => a.artPrice - b.artPrice);
        } else if (sortBy === "High to Low") {
          sortedArts = sortedArts.sort((a, b) => b.artPrice - a.artPrice);
        }
        setArts(sortedArts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching paintings:", error);
        setArts([]);
        setLoading(false);
      });
  }, [currentPage, token, sortBy, setArts]);
  console.log("role", role);

  const handleDelete = async (id) => {
    try {
      await axios
        .delete(`${API}/artist/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.status);
          const updatedArts = arts.filter((art) => art._id !== id);
          setArts(updatedArts);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${API}/artist/update/${artId}`,
        {
          artName,
          artPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setArts(
        arts.map((art) =>
          art._id === artId ? { ...art, artName, artPrice } : art
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTotalPages(Math.ceil(arts.length / itemsPerPage));
  }, [arts, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          style={{
            margin: "0 5px",
            fontWeight: currentPage === i ? "bold" : "normal",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            color: "white",
            backgroundColor: "#B79B54",
          }}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  const renderArtCards = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return arts.slice(startIndex, endIndex).map((painting) => (
      <Box
        data-aos="fade-down"
        data-aos-anchor-placement="top"
        key={painting._id}
        width={"auto"}
        height={"auto"}
        bg="#f5f1ee"
        borderRadius="md"
        boxShadow="md"
      >
        <Image
          width={"100%"}
          objectFit="cover"
          src={painting.artImage[0]}
          alt={painting.artName}
        />

        <Stack pt={5} pr={4} pl={4} pb={5} gap={0} bg={"white"}>
          <Text
            fontWeight={400}
            fontSize={"17px"}
            fontFamily={"Addington CF"}
            lineHeight={"21px"}
            letterSpacing={"1px"}
          >
            {painting.artName}
          </Text>
          <Text
            fontSize={"17px"}
            fontFamily={"sans-serif"}
            color={"rgb(183, 155, 84)"}
            letterSpacing={"1px"}
          >
            {painting.username}
          </Text>

          <Text
            fontSize={"17"}
            fontFamily={"sans-serif"}
            color={"rgb(183, 155, 84)"}
            letterSpacing={"1px"}
          >
            {painting.artCategory}
          </Text>

          <Text
            fontSize={"17px"}
            fontWeight={700}
            fontFamily={"sans-serif"}
            color={"rgb(183, 155, 84)"}
            letterSpacing={"1px"}
          >
            US$ {painting.artPrice}
          </Text>
          <Button
            bg={"rgb(183,155,84)"}
            color={"white"}
            _hover={{ bg: "#48BB78" }}
            onClick={() =>
              handleModalOpen(painting._id, painting.artName, painting.artPrice)
            }
          >
            Edit Details
          </Button>

          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay
              backdropFilter="auto"
              backdropInvert="80%"
              backdropBlur="2px"
            />
            <ModalContent>
              <ModalHeader>Edit Details</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <form onSubmit={handleSubmit}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={artName}
                    onChange={handleNameChange}
                    ref={initialRef}
                    placeholder="Name of your art"
                  />

                  <FormLabel>Price</FormLabel>
                  <Input
                    value={artPrice}
                    onChange={handlePriceChange}
                    placeholder="Enter your price"
                  />

                  <Button
                    onClick={onClose}
                    mt={4}
                    type="submit"
                    colorScheme="blue"
                    mr={3}
                  >
                    Save
                  </Button>
                  <Button mt={4} onClick={onClose}>
                    Cancel
                  </Button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
          <Button
            margin={"auto"}
            width={"100%"}
            bg={"#B79B19"}
            color={"white"}
            _hover={{ bg: "#E53E3E" }}
            onClick={() => handleDelete(painting._id)}
            mt={2}
          >
            Delete
          </Button>
        </Stack>
      </Box>
      // </Link>
    ));
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };
  const email = localStorage.getItem("username");
  return (
    <Box bg="rgb(250,248,244)">
      <Center py={6}>
        <Box
          maxW={"320px"}
          w={"full"}
          bg={"rgb(250,248,244)"}
          rounded={"lg"}
          p={6}
          textAlign={"center"}
        >
          <Avatar
            size={"xl"}
            src={
              "https://i.pinimg.com/280x280_RS/6b/71/20/6b7120f396928249c8e50953e64d81f5.jpg"
            }
            alt={"Avatar Alt"}
            mb={4}
            pos={"relative"}
            _after={{
              content: '""',
              w: 4,
              h: 4,
              bg: "green.300",
              border: "2px solid white",
              rounded: "full",
              pos: "absolute",
              bottom: 0,
              right: 3,
            }}
          />
          <Heading fontSize={"28px"} fontWeight={600} fontFamily={"body"}>
            {/* {username} */}
          </Heading>
          <Text fontWeight={600} color={"gray.500"} mb={4}>
            {email}
          </Text>

          <Stack align={"center"} justify={"center"} direction={"row"} mt={6}>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #artist
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #drawing
            </Badge>
            <Badge
              px={2}
              py={1}
              bg={useColorModeValue("gray.50", "gray.800")}
              fontWeight={"400"}
            >
              #sketch
            </Badge>
          </Stack>

          {role == "artist" && (
            <Stack mt={8} direction={"row"} spacing={4}>
              <Button
                flex={1}
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  setShow((prev) => !prev);
                }}
              >
                Add new art <AddIcon ml={2} />
              </Button>
            </Stack>
          )}
          {role == "artist" && show && (
            <Box>
              <form
                onSubmit={handleSubmitPostForm}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder="Enter art name"
                  value={artNamePost}
                  onChange={handleArtNameChange}
                />
                <input
                  type="number"
                  placeholder="Enter price"
                  value={artPricePost}
                  onChange={handleArtPriceChange}
                />
                <input
                  type="file"
                  name="artImage"
                  onChange={handleFileChange}
                />
                <input
                  onChange={handleCreatedAtChange}
                  value={created_at}
                  type="number"
                  id="yearInput"
                  name="year"
                  min="1900"
                  max="2099"
                  placeholder="Year of creation"
                />

                <select
                  id="artCategory"
                  name="artCategory"
                  value={artCategory}
                  onChange={handleArtCategoryChange}
                >
                  <option value="">Select an option</option>
                  {[
                    "Paintings",
                    "Prints",
                    "Sculpture",
                    "Photography",
                    "Inspiration",
                    "Drawings",
                  ].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  id="artDimension"
                  name="artDimension"
                  value={artDimension}
                  onChange={handleArtDimensionChange}
                  placeholder="Enter art dimensions"
                />
                <button type="submit">Submit</button>
              </form>
            </Box>
          )}
        </Box>
      </Center>

      {role !== "artist" ? (
        ""
      ) : loading ? (
        <Grid
          gap={8}
          p={8}
          templateColumns={[
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
            "repeat(4,1fr)",
            "repeat(5,1fr)",
            "repeat(5,1fr)",
          ]}
          alignItems="center"
        >
          {Array.from({ length: itemsPerPage }).map((_, index) => (
            <Box
              key={index}
              width={"auto"}
              height={"auto"}
              bg="#f5f1ee"
              borderRadius="md"
              boxShadow="md"
            >
              <Skeleton
                height="200px"
                startColor="rgb(250,248,244)"
                endColor="rgb(150,148,144)"
              />
            </Box>
          ))}
        </Grid>
      ) : (
        <>
          <Flex marginRight={4} justifyContent="flex-end" pt={4} pr={6}>
            {role == "artist" && (
              <select
                style={{
                  backgroundColor: "rgb(250,248,244)",
                  fontSize: "16px",
                  fontFamily: "sans-serif",
                  height: "40px",
                  paddingLeft: "10px",
                  width: "140px",
                  border: "1px solid rgb(183, 155, 84)",
                  appearance: "none",
                  background:
                    'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%238a8a8a"><path d="M7 10l5 5 5-5z"/></svg>\') no-repeat right 10px center',
                  backgroundSize: "36px 36px",
                }}
                defaultValue=""
                onFocus={(e) => {
                  e.target.style.borderColor = "green";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#f5f1ee";
                }}
                onChange={handleSortChange}
              >
                <option value="" disabled selected hidden>
                  Sort By
                </option>
                <option value="Newest">Newest</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
            )}
          </Flex>
          <Grid
            gap={8}
            p={8}
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4,1fr)",
              "repeat(5,1fr)",
              "repeat(5,1fr)",
            ]}
            alignItems="center"
          >
            {renderArtCards()}
          </Grid>
          <Flex justifyContent="center" alignItems="center" mt={4} p={3}>
            {renderPaginationButtons()}
          </Flex>
        </>
      )}

      <p
        style={{
          borderTop: "1px solid rgb(183, 155, 84)",
          width: "95%",
          margin: "0 auto",
          padding: "10px",
        }}
      ></p>

      <Box
        p={8}
        pb={20}
        fontSize={"10px"}
        fontFamily={"sans-serif"}
        textAlign={"center"}
      >
        <Text pb={4}>
          Original, hand-picked contemporary paintings for sale from the finest
          artists around the world. The Artling offers a curated selection of
          paintings, including{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            abstract paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            figurative paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            geometric paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            minimalist paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            nature paintings
          </span>
          , and{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            pop paintings
          </span>
          . If you are looking for even more styles, you can look forward to
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            portraiture paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            stil life paintings
          </span>
          ,{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            street art paintings
          </span>
          ,
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            surrealist paintings
          </span>
          ,
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            typography paintings
          </span>{" "}
          and{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            urban paintings
          </span>{" "}
          in a range of price, colour and size to suit your preference.
        </Text>
        <Text pb={4}>
          Whether you are looking for paintings for your bedroom, kitchen,
          living room, or even your office, we have you covered with thousands
          of paintings from popular and emerging artists and galleries from
          around the world. Dont forget to look at our{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            exclusive paintings
          </span>{" "}
          and{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            framed paintings
          </span>{" "}
          - available only on The Artling.
        </Text>
        <Text pb={4}>
          Take your pick from our expertly-curated selection of paintings and
          get the works that you love delivered right to your doorstep. When you
          buy contemporary paintings from The Artling, you can buy with
          confidence as each item comes with a Certificate of Authenticity and a
          3-day return window.
        </Text>
        <Text pb={4}>
          If you have particular or specific requirements, use our{" "}
          <span style={{ color: "rgb(115,164,253)", cursor: "pointer" }}>
            Art Advisory service{" "}
          </span>{" "}
          and get personalized recommendations from an expert art curator to
          find the perfect artwork for you.
        </Text>
      </Box>
    </Box>
  );
};

export default ArtPortfolio;
