import {
  border,
  Box,
  Flex,
  Grid,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { API } from "../../API/api";
AOS.init();

const images = [
  "https://ik.imagekit.io/theartling/prod/banners/Banner/245a41e41489485ca732825fc36d596a.jpeg",
  "https://ik.imagekit.io/theartling/prod/banners/Banner/457e5452c9344b34949f10a074275e91.jpeg",
  "https://ik.imagekit.io/theartling/prod/banners/Banner/88f5df715f784aa9b005c9d49de17072.jpeg",
];
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  const [hoveredBox, setHoveredBox] = useState(null);
  const boxWidth = useBreakpointValue({ base: "100%", sm: "45%" });

  const boxes = [
    {
      src: "https://ik.imagekit.io/theartling/prod/tr:w-2400,h-2400,c-at_max,bg-000000,f-png/consultancy/Project/f2edf3da62e5457587a0f51ed4eb1032.jpg",
      text: "Patina Hotel",
      p: "maldiv",
    },
    {
      src: "https://ik.imagekit.io/theartling/prod/tr:w-2400,h-2400,c-at_max,bg-000000,f-png/consultancy/Project/d666d236f1334c159ff3bfba6567efe3.JPG",
      text: "Revolver",
      p: "singapore",
    },
  ];

  const handleExploreClick = () => {
    window.scrollTo(0, 0);
    navigate("/art");
  };

  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/art`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const numberOfArtworks = 4;
        const randomArtworks = [];
        for (let i = 0; i < numberOfArtworks; i++) {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          randomArtworks.push(response.data[randomIndex]);
        }
        setArts(randomArtworks);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching paintings:", error);
        setArts([]);
        setLoading(false);
      });
  }, []);


  const renderArtCards = () => {
    return arts.slice(0, 4).map((painting) => (
      <Box
        data-aos="fade-down"
        data-aos-anchor-placement="top"
        key={painting._id}
        width={"auto"}
        height={"auto"}
        bg="#f5f1ee"
        borderRadius="md"
        boxShadow="md"
        textAlign={"center"}
        fontSize={"22px"}
        fontFamily={"sans-serif"}
      >
        <Image
          width={"100%"}
          objectFit="cover"
          src={painting.artImage[0]}
          alt={painting.artName}
        />

        <Stack pt={5} pl={4} pb={5} gap={0} bg={"white"}>
          <Text
            fontWeight={400}
            fontSize={"17px"}
            fontFamily={"Addington CF"}
            lineHeight={"21px"}
            letterSpacing={"1px"}
          >
            {painting.artName}
          </Text>
          <Text>{painting.artCategory}</Text>
        </Stack>
      </Box>
    ));
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      alignItems={"center"}
      padding={4}
      backgroundColor={"#f5f1ee"}
    >
      <Text
        w={"80%"}
        alignSelf={"flex-start"}
        pl={"5"}
        fontSize={["30px", "50px", "60px"]}
        font
        fontFamily={"Addington CF"}
      >
        Transforming spaces with art and design
      </Text>
      <Box
        w={"95%"}
        height={["350px", "500px", "650px"]}
        position="relative"
        mt={"30px"}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            boxSize="100%"
            objectFit="cover"
            position="absolute"
            width={"100%"}
            top="0"
            left="0"
            opacity={index === currentIndex ? 1 : 0}
            transition="opacity 1s ease-in-out"
          />
        ))}
      </Box>
      <Text
        fontSize={["20px", "25px", "30px"]}
        marginTop={"5px"}
        fontFamily={"Addington CF"}
      >
        Discover curated art & design Discover curated art & design
      </Text>

      <Text
        color={"#595957"}
        fontSize={["20px", "40px"]}
        marginTop={"40px"}
        mar
      >
        Selected Projets
      </Text>
      <Box
        data-aos="fade-down"
        data-aos-anchor-placement="top"
        display={"flex"}
        width={"70%"}
        flexWrap={"wrap"}
        gap={"15px"}
        marginTop={"30px"}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          {boxes.map((box, index) => (
            <Box
              key={index}
              width={boxWidth}
              height="auto"
              position="relative"
              overflow="hidden"
              transition="background-color 0.3s ease"
              onMouseEnter={() => setHoveredBox(index)}
              onMouseLeave={() => setHoveredBox(null)}
              bg={hoveredBox === index ? "black" : "transparent"}
            >
              <Image
                src={box.src}
                alt="image"
                width="100%"
                height={"100%"}
                opacity={hoveredBox === index ? 0.7 : 1}
                transition="opacity 0.3s ease"
              />
              {hoveredBox === index && (
                <VStack
                  position="absolute"
                  top={0}
                  left={0}
                  width="100%"
                  height="100%"
                  bg="black.500"
                  color="white"
                  justifyContent="center"
                  textAlign={"center"}
                >
                  <Text
                    fontSize={"30px"}
                    fontWeight={"700"}
                    alignItems="center"
                  >
                    {box.text}
                  </Text>
                  <Text fontSize={"20px"} alignItems="center">
                    {box.p}
                  </Text>
                </VStack>
              )}
            </Box>
          ))}
        </Flex>
      </Box>
      <Flex alignItems={"flex-end"} mt={8}>
        <Text fontSize={["28px", "38px"]} fontFamily={"Addington CF"}>
          Discover more projects{" "}
        </Text>
      </Flex>
      <Box
        data-aos="fade-down"
        display={"flex"}
        flexDirection={["column", "column", "row"]}
        justifyContent={["center", "center", "space-around"]}
        gap={["20px", "20px", "40px"]}
        mt={12}
        fontFamily={"sans-serif"}
        flexWrap={"wrap"}
        width={"95%"}
      >
        <Box
          w={["100%", "100%", "400px"]}
          h="400px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          textAlign="center"
          p={4}
        >
          <Image
            src="https://img.freepik.com/free-photo/abstract-design-with-colorful-patterns-nature-leaf-generated-by-ai_188544-15573.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=sph"
            alt="Random Image"
            w="100%"
            h="200px"
            objectFit="cover"
            mb={2}
          />
          <Text fontSize="xl" fontWeight="bold" mb={1} mt={4}>
            Generative Ai Art
          </Text>
          <Text fontSize="md" color="gray.500" mb={4} mt={4}>
            Access our proprietary tools to visualize artworks, submit proposals
            and manage projects.
          </Text>
        </Box>

        <Box
          w={["100%", "100%", "400px"]}
          h="400px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          textAlign="center"
          p={4}
        >
          <Image
            src="https://img.freepik.com/free-photo/multi-colored-butterfly-flies-among-vibrant-nature-beauty-generated-by-ai_188544-19743.jpg?w=740&t=st=1715420413~exp=1715421013~hmac=76e6f296837ac93636a8f8cc6020997d48385e8683d90b8eff65877d4337743f"
            alt="Random Image"
            w="100%"
            h="200px"
            objectFit="cover"
            mb={2}
          />
          <Text fontSize="xl" fontWeight="bold" mb={1} mt={4}>
            Butterfly Ai Art
          </Text>
          <Text fontSize="md" color="gray.500" mb={4} mt={4}>
            Exclusive discounts up to 15%, only for design professionals.
          </Text>
        </Box>
        <Box
          w={["100%", "100%", "400px"]}
          h="400px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          textAlign="center"
          p={4}
        >
          <Image
            src="https://img.freepik.com/free-photo/young-woman-embodies-glamour-sensuality-generative-ai_188544-9751.jpg?size=626&ext=jpg&ga=GA1.1.1831257305.1697930565&semt=sph"
            alt="Random Image"
            w="100%"
            h="200px"
            objectFit="cover"
            mb={2}
          />
          <Text fontSize="xl" fontWeight="bold" mb={1} mt={4}>
            Fashion Sunglasses
          </Text>
          <Text fontSize="md" color="gray.500" mb={4} mt={4}>
            Seamless personalized support to manage your order from your initial
            inquiry all the way to delivery.
          </Text>
        </Box>
      </Box>

      {/* {"art card content here"} */}

      <Box
        display={"flex"}
        justifyContent={"center"}
        mt={6}
        flexDir={"column"}
        alignItems={"center"}
      >
        <Text
          fontSize={["18px", "25px", "30px"]}
          fontFamily={"Addington CF"}
          fontWeight={"400"}
        >
          Browse trending artworks
        </Text>
        <Box>
          <Grid
            gap={8}
            p={8}
            templateColumns={[
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
              "repeat(4,1fr)",
              "repeat(4,1fr)",
            ]}
            mt={5}
            justifyContent={"center"}
            alignContent={"center"}
            alignItems="center"
          >
            {renderArtCards()}
          </Grid>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          width={["150px", "250px", "350px"]}
          _hover={{ bg: "#B79B19" }}
          height={"60px"}
          textAlign={"center"}
          borderRadius={"10px"}
          backgroundColor={"#B79B54"}
          fontSize={["20px", "25px", "30px"]}
          fontFamily={"sans-serif"}
          mt={5}
          cursor={"pointer"}
          onClick={handleExploreClick}
        >
          <Text color={"white"}>Explore</Text>
        </Box>
      </Box>

      <Box
        w={"100%"}
        mt={20}
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text
          fontSize={"30px"}
          textAlign={"center"}
          mt={4}
          fontFamily={"Addington CF"}
        >
          Our clients
        </Text>
        <Box width={"80%"}>
          <Box>
            <Image src="https://ik.imagekit.io/theartling/prod/dynamic_images/Image/f070b9e459bf42dca2d7f8febfe264fc.png?tr=w-2220" />
          </Box>
        </Box>
      </Box>

      <Box mt={6} width={"100%"} borderBottom="1px solid #D9D1C2"></Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
        mt={12}
        textAlign={"center"}
        width={"95%"}
        alignItems={"center"}
      >
        <Text fontSize={"35px"} fontFamily={"Addington CF"}>
          New Design
        </Text>
        <Box
          display={["column", "flex"]}
          width={"100%"}
          justifyContent={"space-between"}
          mt={12}
          mb={12}
          textAlign={"center"}
          gap={"5px"}
        >
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-520,h-520,bg-FFFFFF/dynamic_images/Image/ad497378b24f4087995bea9d4e9719d4.JPG" />
            <Text mt={4} mb={12} fontSize={"20px"}>
              Design Objects
            </Text>
          </Box>
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-520,h-520,bg-FFFFFF/dynamic_images/Image/75e6ad5d1c0840168c39f32d67a7d249.jpg" />
            <Text mt={4} mb={12} fontSize={"20px"}>
              Furniture
            </Text>
          </Box>
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-520,h-520,bg-FFFFFF/dynamic_images/Image/a5cd9baac7624f15b695a1937b674f78.jpg" />
            <Text mt={4} mb={12} fontSize={"20px"}>
              Lighting
            </Text>
          </Box>
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-520,h-520,bg-FFFFFF/dynamic_images/Image/7d3648d9a83f4bebbb5906d2ee60a34b.jpg" />
            <Text mt={4} mb={12} fontSize={"20px"}>
              Tableware
            </Text>
          </Box>
        </Box>
      </Box>

      <Box mt={6} width={"100%"} borderBottom="1px solid #D9D1C2">
        {/* Content goes here */}
      </Box>

      <Box
        display={"flex"}
        flexDir={"column"}
        gap={"15px"}
        mt={12}
        textAlign={"center"}
        alignItems={"center"}
        fontFamily={"Addington CF"}
        width="95%"
      >
        <Text fontSize={"35px"} fontFamily={"Addington CF"}>
          Artzine
        </Text>
        <Box
          display={"flex"}
          flexDir={["column", "row"]}
          gap={"15px"}
          mt={12}
          textAlign={"left"}
        >
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-998,h-760,bg-FFFFFF/original_images/biennale-arte-24-banner2.jpg" />
            <Text fontSize={["16px", "20px"]} mt={4} color={"#BDA362"}>
              April 19, 2024 by Aena Nabong
            </Text>
            <Text
              fontSize={["14px", "18px", "25px", "30px"]}
              _hover={{ color: "#BDA362" }}
            >
              Your Guide to the Venice Biennale 2024: The Artling&apos;s Top
              Picks
            </Text>
          </Box>
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-998,h-760,bg-FFFFFF/original_images/Image_courtesy_of_Tatler_Asia.webp" />
            <Text fontSize={["20px", "16px"]} color={"#BDA362"} mt={4}>
              April 17, 2024 by Liyana Safari
            </Text>
            <Text
              fontSize={["14px", "18px", "25px", "30px"]}
              _hover={{ color: "#BDA362" }}
            >
              An Interview with André Fu, one of Asia’s most sought-after
              Interior Designers
            </Text>
          </Box>
          <Box>
            {" "}
            <Image src="https://ik.imagekit.io/theartling/prod/tr:w-998,h-760,bg-FFFFFF/original_images/image_courtesy_of_mega_furniture.jpeg" />
            <Text fontSize={["20px", "16px"]} mt={4} color={"#BDA362"}>
              April 11, 2024 by Liyana Safari
            </Text>
            <Text
              fontSize={["14px", "18px", "25px", "30px"]}
              _hover={{ color: "#BDA362" }}
            >
              Selecting the Perfect Contemporary Art Style for Your Interior
              Design Projects
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        w="100%"
        borderRadius="lg"
        overflow="hidden"
        textAlign="center"
        p={8}
        mt={"30px"}
      >
        <Image
          src="https://ik.imagekit.io/theartling/prod/dynamic_images/Image/650c6bbdebc74338b468f5eb0addb5f9.jpeg?tr=w-2220"
          alt="Random Image"
          w="100%"
          objectFit="cover"
          mb={2}
        />
      </Box>
    </Box>
  );
};

export default Home;
