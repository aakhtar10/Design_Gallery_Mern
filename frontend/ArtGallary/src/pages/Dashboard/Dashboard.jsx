import './dashboard.css'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import DashNav from './Dashbordnav';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
// ..
AOS.init();
const Dashboard = () => {
  return (
    <>

      <Box display={"flex"} flexDir={"column"} alignItems={"center"} mt={10} fontFamily={"Addington CF"}>
        <Box display={"flex"} flexDir={["column", "column", "row"]} width={"90%"} gap={"20px"}  >
          <Box flex="1">
            <Heading as="h1" fontSize={["18px", "22px", "25px"]}>ART GALLERY</Heading>
            <Box mt={10}>
              <Text fontSize={["18px", "22px", "25px"]} lineHeight={2}>
                Art is like a multifaceted gem, revealing different facets to different beholders.
                It's not merely about capturing the external world but about stirring emotions,
                sparking thoughts, and inciting reflection. Consider Van Gogh's swirling stars,
                Picasso's fragmented perspectives, or the haunting depths of Frida Kahlo's self-portraits.
              </Text>
            </Box>
          </Box>
          <Box flex="1" >
            <Image src="https://c4.wallpaperflare.com/wallpaper/760/955/638/artwork-landscape-sky-mountains-wallpaper-preview.jpg" alt="" />
          </Box>
        </Box>
        <div className="main-2">
          <h1>ART CATEGORY</h1>
          <div className="category">

            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://t4.ftcdn.net/jpg/05/82/15/65/360_F_582156555_hbyp1b5f45xGtOp2PPDngIOX4YKv7tZF.jpg" alt="" />
              </div>

            </div>
            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://m.media-amazon.com/images/I/61lYC1XcSOL._AC_UF894,1000_QL80_.jpg" alt="" />
              </div>

            </div>
            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://study.com/cimages/multimages/16/800px-pieter_bruegel_the_elder_-_landscape_with_the_fall_of_icarus_-_wga033222420957081669808990.jpg" alt="" />
              </div>

            </div>
            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://t4.ftcdn.net/jpg/05/48/86/57/360_F_548865785_5je14mp9oO6KiOAnphkcTaiFMqOqHqAl.jpg" alt="" />
              </div>

            </div>
            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://media.tate.org.uk/aztate-prd-ew-dg-wgtail-st1-ctr-data/images/fase-four-movements-steve-reich_0.width-340.jpg" alt="" />
              </div>

            </div>
            <div className="cat" data-aos="flip-left">
              <div className="img">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzxXxay6ZUg9b7dhih5wZJszf0qK-Du6ABL1veCfjjQg&s" alt="" />
              </div>

            </div>

          </div>
        </div>
      </Box>

    </>

  );
};

export default Dashboard;