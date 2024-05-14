import { Box, Flex, Image, Text } from "@chakra-ui/react";
import "./About.css";

import { useState } from "react";

const About = () => {
  const images = [
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/_mg_9507.jpg",
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/07_dsc5126.jpg",
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/07_dsc5126.jpg",
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/xt3b907652357509551o_1600_1066.jpeg",
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/dsc_9189.jpg",
    "https://artlogic-res.cloudinary.com/w_1240,h_620,c_limit,f_auto,fl_lossy,q_auto/ws-artlogicwebsite0399/usr/library/images/main/pages/24/_mg_9335.jpg",
  ];
  const [selectedImage, setSelectedImage] = useState(images[0]);



  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

 

  return (
    <>
      <Box
        width={"100%"}
        display={"flex"}
        flexDir={"column"}
        gap={"30px"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={10}
      >
        <Box width={"90%"}>
          {" "}
          {/* <Text alignSelf={"center"} fontSize={"30px"}>
            About
          </Text> */}
        </Box>
        <Box width={"90%"}>
          <Flex direction="column" alignItems="center">
            <Box borderRadius="lg" p={4} m={4} width={"80%"}>
              {selectedImage && (
                <Image
                  src={selectedImage}
                  alt="Selected Image"
                  width={"100%"}
                />
              )}
            </Box>
            <Flex width={["90%", "60%"]}>
              {images.map((image, index) => (
                <Box key={index} m={2} cursor="pointer">
                  <Image
                    width={"100%"}
                    src={image}
                    alt={`Image ${index}`}
                    onClick={() => handleImageClick(image)}
                  />
                </Box>
              ))}
            </Flex>
          </Flex>
        </Box>
        <Box
          width={"90%"}
          display={"flex"}
          justifyContent={"center"}
          flexDir={"column"}
          gap={"25px"}
          letterSpacing={["0", "1", "2"]}
          mb={5}
        >
          <Text>
            Representing a roster of artists across four generations, Vadehra
            Art Gallery was established in 1987 with a passion to pioneer South
            Asian art as a conduit of cultural celebration, intellect and value
            in the public milieu. A confidante to art history and a paladin to
            contemporary art, the gallery supports a vibrant and flourishing
            ecosystem that at its centre heroes the artist and their work.
          </Text>
          <Text>
            Modern masters like M.F. Husain, Ram Kumar, S.H. Raza and Tyeb Mehta
            find prime spot in the gallery’s calendar alongside the subsequent
            generation of modernists like Arpita Singh, A. Ramachandran, Nalini
            Malani, Gulammohammed Sheikh and Rameshwar Broota. The gallery’s
            expansive contemporary programme includes some of the most exciting
            names in the Subcontinent such as Atul Dodiya, Shilpa Gupta, Anju
            Dodiya, N.S. Harsha and Sunil Gupta, as well as young emerging
            talent like Zaam Arif, Shrimanti Saha and Shailesh B.R.
          </Text>
          <Text>
            Vadehra Art Gallery’s active and comprehensive programming takes the
            form of carefully curated and frequent exhibitions at two prominent
            locations in Delhi, alongside art events, engaging conversations and
            a growing digital platform, including virtual exhibitions and an
            online shop. With a maturing global presence, the gallery continues
            to present curated projects at prestigious art fairs and
            institutional venues around the world, including the Frieze fairs in
            London and New York, and Art Basel in Basel and Hong Kong, among
            others.
          </Text>
          <Text>
            As a key artistic interlocutor to regional and international
            audiences, the gallery ventured into publishing in 1996, finding a
            crucial need for adequate documentation, critical writing, and
            quality reproduction of images in Indian art. Over the last two
            decades, the gallery has published several books and monographs in
            collaboration with major publishing houses like Penguin and Prestel,
            as well as hundreds of illustrated exhibition catalogues, in
            addition to contemporaneously producing literature on ongoing
            exhibitions and artist projects.
          </Text>
        </Box>
        <Box mt={6} width={"90%"} borderBottom="1px solid #D9D1C2"></Box>
        <Box
          width={"90%"}
          display={"flex"}
          justifyContent={"space-around"}
          flexDir={"column"}
          lineHeight={2}
          mb={5}
        >
          <Text>ART GALLERY </Text>
          <Text>
            D-40 Defence Colony, New Delhi 110024, India | T +91 11 24622545 /
            +91 11 24615368
          </Text>
          <Text>
            D-53 Defence Colony, New Delhi 110024, India | T +91 11 46103550 /
            +91 11 4610355{" "}
          </Text>
          <Text>E art@vadehraart.com</Text>
        </Box>

        <footer>
          <p>
            &copy; {new Date().getFullYear()} Art Gallery. All rights reserved.
          </p>
        </footer>
      </Box>
    </>
  );
};

export default About;
