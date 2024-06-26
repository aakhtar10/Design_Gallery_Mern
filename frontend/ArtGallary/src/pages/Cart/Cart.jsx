import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { API } from "../../API/api";
// import { useParams } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${API}/art/cart`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(response.data);
        console.log("Cart items:", response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `${API}/art/removeFromCart/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      // Update cart items state to reflect the removal
      setCartItems((prevItems) =>
        prevItems.filter((item) => item._id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.artPrice * item.quantity,
    0
  );
  return (
    <Box p={16} bg={"rgb(250,248,244)"}>
      <Text
        pt={8}
        pb={6}
        fontWeight={400}
        fontSize={["30px", "30px", "35px", "35px", "40px"]}
        fontFamily={"Addington CF"}
      >
        Your cart
      </Text>
      {cartItems.length == 0 ? (
        <Text pb={16} textAlign={"center"} fontSize={36} pt={16}>
          Your cart is empty.
        </Text>
      ) : (
        <Box
          pt={6}
          pb={12}
          bg={"rgb(243,243,243)"}
          borderWidth="1px"
          borderRadius="md"
          width={["100%"]}
        >
          <Flex
            pl={5}
            pr={5}
            align={"center"}
            alignContent={"center"}
            m={"auto"}
            mb={6}
            fontSize={32}
            fontFamily={"Addington CF"}
            justifyContent={{ base: "center", md: "space-between" }}
          >
            <Text>Item</Text>
            <Text pr={5} display={{ base: "none", md: "block" }}>
              Subtotal
            </Text>
          </Flex>
          {cartItems.map((item) => (
            <Box
              key={item._id}
              bg={"rgb(250,248,244)"}
              borderWidth="1px"
              // borderRadius="md"
            >
              <Box p={4} borderWidth="1px">
                <Flex
                  flexDir={["column", "row", "row"]}
                  gap={6}
                  align={"center"}
                >
                  <Image
                    h={32}
                    w={32}
                    src={item.artImage[0]}
                    alt={item.artName}
                  />
                  <Flex justifyContent={"space-between"} width={"100%"}>
                    <Box fontSize={18} flex={"1"}>
                      <Text fontWeight={700}>{item.artName}</Text>
                      <Text>by {item.username}</Text>
                      <Text>{item.artCategory}</Text>
                      <Text>US$ {item.artPrice}</Text>
                      <Text>quantity: {item.quantity}</Text>
                      <Button
                        mr={8}
                        bg={"none"}
                        border={"2px solid #f5f1ee "}
                        _hover={{ textDecoration: "underline", bg: " #f5f1ee" }}
                        onClick={() => removeFromCart(item._id)}
                      >
                        remove
                      </Button>
                    </Box>
                    <Box>
                      <Text
                        pt={12}
                        pr={[0, 6, 6]}
                        fontSize={[22, 24, 26]}
                        fontWeight={700}
                      >
                        US$ {item.artPrice * item.quantity}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
              </Box>
            </Box>
          ))}
          <Flex justifyContent="space-between" pl={6} pr={12} pt={6}>
            <Text fontSize={22} fontWeight="bold">
              Total:
            </Text>
            <Text fontSize={22} fontWeight="bold">
              US$ {total}
            </Text>
          </Flex>
        </Box>
      )}
    </Box>
  );
};

export default Cart;

// export default Cart;
