import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Text,
  Stack,
  Image,
  Grid,
  Flex,
  Skeleton,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { API } from "../../API/api";
// ..
AOS.init();
const Prints = () => {
  const [arts, setArts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/art/prints`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        let sortedArts = response.data;
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
  }, [currentPage, token, sortBy]);

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
        <Link key={painting._id} to={`/art/${painting._id}`}>
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
        </Stack>
      </Box>
      </Link>
    ));
  };
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <Box bg="rgb(250,248,244)">
      <Text
        pt={8}
        pl={8}
        fontWeight={400}
        fontSize={["20px", "30px", "35px", "40px", "50px"]}
        fontFamily={"Addington CF"}
      >
        Original Contemporary Artworks for Sale
      </Text>
      <Flex marginRight={4} justifyContent="flex-end" pt={4} pr={6}>
        {/* Your sorting select input */}
      </Flex>
      {loading ? (
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

export default Prints;
