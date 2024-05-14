import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Image, Text, Flex, Button, useToast } from "@chakra-ui/react";
import { API } from "../../API/api";

const SingleArt = () => {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [imageIndex, setImageIndex] = useState(0);
  const token = localStorage.getItem("token");
  const [currentUserID, setUserID] = useState(null);
  const toast = useToast();
  useEffect(() => {
    axios
      .get(`https://artgallary.onrender.com/artist/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setArt(response.data.getArtById);
        setUserID(response.data.userID);
        // console.log("data", response.data);
      })
      .catch((error) => {
        console.error("Error fetching art:", error);
        setArt(null);
      });
  }, [id, token]);

  const addToCart = async (userId, artId) => {
    try {
      await axios.post(
        `${API}/art/addToCart`,
        {
          userId: userId,
          artId: artId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Item added to cart",
        status: "success",
        isClosable: true,
      });
      // console.log(response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    if (art) {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % art.artImage.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [art]);

  if (!art) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      bg={"rgb(250,248,244)"}
      h={"auto"}
      pt={16}
      border={"1px solid rgb(250,248,244)"}
      borderRadius={"10px"}
    >
      <Flex
        flexDir={["column", "column", "column", "row"]}
        m={8}
        bg={"#f5f1ee"}
        gap={8}
      >
        <Box
          width={["100%", "100%", "100%", "50%"]}
          minH={["300px", "300px", "300px", "300px"]}
          maxH={["500px", "500px", "500px", "500px"]}
        >
          {art.artImage && (
            <Image
              pt={16}
              m={"auto"}
              width={"90%"}
              maxH={["450px", "450px", "450px", "490px"]}
              objectFit="cover"
              src={art.artImage[imageIndex]}
              alt={art.artName}
            />
          )}
        </Box>
        <Box
          width={["100%", "100%", "100%", "50%"]}
          pt={5}
          pb={5}
          gap={0}
          bg={"white"}
        >
          <Text
            pl={10}
            fontSize={["20px", "30px", "35px", "40px", "50px"]}
            fontFamily={"Addington CF"}
          >
            {art.artName}
          </Text>
          <Text pl={10} pb={6} fontSize="lg" _hover={{ color: "#b79b54" }}>
            By{" "}
            <span
              style={{
                fontSize: "26px",
                cursor: "pointer",

                textDecoration: "underline",
              }}
            >
              {art.username}
            </span>
          </Text>
          <Text
            pl={10}
            fontSize={["20px", "20px", "30px", "30px", "30px"]}
            color={"#b79b54"}
            fontFamily={"Addington CF"}
          >
            US$ {art.artPrice}
          </Text>
          <p
            style={{
              borderTop: "1px solid rgb(183, 155, 84)",
              width: "90%",
              margin: "10px auto",
              textAlign: "start",
              paddingRight: "40px",
            }}
          ></p>
          <Flex justifyContent={"space-between"}>
            <Text
              pl={10}
              fontSize={["16px", "18px", "24px", "24px", "24px"]}
              fontFamily={"Addington CF"}
            >
              Overview
            </Text>
            <Text pr={10} fontFamily={"Addington CF"}>
              ___
            </Text>
          </Flex>
          <Text pl={10} fontSize="18px">
            <li>{art.created_at}</li>
          </Text>
          <Text pl={10} fontSize="18px">
            <li>{art.artCategory}</li>
          </Text>
          <Text pl={10} fontSize="18px">
            <li>{art.artDimension}</li>
          </Text>
          <Text
            pl={8}
            pt={3}
            pb={3}
            fontSize="14px"
            color={"rgb(0, 0, 0, 0.48)"}
          >
            Note: Actual colours may very due to photography & computer settings
          </Text>
          <p
            style={{
              borderTop: "1px solid rgb(183, 155, 84)",
              width: "90%",
              margin: "10px auto",
              textAlign: "start",
              paddingRight: "40px",
            }}
          ></p>
          <Text
            pl={10}
            fontSize={["16px", "18px", "24px", "24px", "24px"]}
            fontFamily={"Addington CF"}
          >
            Shipping
          </Text>
          <Text pl={10} fontSize={["14px", "14px", "18px", "18px", "18px"]}>
            <li>Estimated delivery for this item is 3 - 5 business days</li>
          </Text>
          <Text pl={10} fontSize={["14px", "14px", "18px", "18px", "18px"]}>
            <li>Please note that item requires crating for shipment</li>
          </Text>
          <Text
            pl={10}
            pb={3}
            fontSize={["14px", "14px", "18px", "18px", "18px"]}
          >
            <li>Shipping cost will be calculated upon checkout</li>
          </Text>
          <p
            style={{
              borderTop: "1px solid rgb(183, 155, 84)",
              width: "90%",
              margin: "10px auto",
              textAlign: "start",
              paddingRight: "40px",
            }}
          ></p>
          <Flex mt={8} justifyContent={"center"}>
            <Button
              borderRadius={"1px"}
              size={"lg"}
              color={"white"}
              width={"80%"}
              bg={"rgb(183,155,84)"}
              _hover={{ bg: "#B79B19" }}
              onClick={() => addToCart(currentUserID, art._id)}
            >
              Add to Cart
            </Button>
          </Flex>
        </Box>
      </Flex>
      <Flex
        bg={"rgb(245,241,238)"}
        p={10}
        gap={10}
        justifyContent={"space-between"}
        mb={10}
      >
        <Flex direction={"column"}>
          <Text>Sourcing for a project?</Text>
          <Text>
            We have exclusive access for you. Browse our extensive collection,
            get trade-only discounts and dedicated customer support. We make it
            easier for you to make your project a success.
          </Text>
        </Flex>
        <Button
          borderRadius={"1px"}
          size={"lg"}
          fontSize={["12px", "12px", "16px", "20px", "20px"]}
          color={"white"}
          w={["950px", "900px", "60%", "60%", "60%"]}
          bg={"rgb(183,155,84)"}
          _hover={{ bg: "#B79B19" }}
        >
          Join our Trade Program
        </Button>
      </Flex>
    </Box>
  );
};

export default SingleArt;
