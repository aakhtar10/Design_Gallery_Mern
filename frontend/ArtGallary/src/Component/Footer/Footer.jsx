

  import {Box, Text, Input, Stack, Button, Container, SimpleGrid,  Heading  ,Image} from '@chakra-ui/react'
import React from 'react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

  const Footer = () => {
    return (
        
        <Box bg='#f5f1ee' w='100%' p={4} color='white'>
 <Stack align={'flex-start'}
        alignItems={'center'}>


      {/* <Image src='https://img.freepik.com/premium-vector/art-gallery-logo-design_92167-618.jpg'  width={'140px'} alt='Dan Abramov' /> */}
        <Text fontSize={'ms'} textAlign={'center'} width={'230px'} color='black' >Subscribe for the latest updates in contemporary art & design!</Text>
        <Stack direction={'row'}>
        <Input marginTop={"20px"}
    color='tomato'
    placeholder='Enter Your Email'
    bg='white'
    _placeholder={{ opacity: 1.8, color: 'grey' }}
  />
          <Button
  size='md'
  height='38px'
  width='140px'
  borderColor='none'
  marginTop={"20px"}
  bg={'#b79b54'}
  color='white'
  _hover={{ color: 'none' }}
>
  Subscribe
</Button>
        </Stack>
      </Stack>
     
            <Stack direction={'row'} marginTop={"30px"} justifyContent={"center"} spacing={6}>
          <Button label={'Twitter'} href={'#'}>
            <FaTwitter color='#169bef'  />
          </Button>
          <Button label={'YouTube'} href={'#'}>
            <FaYoutube color='red' />
          </Button>
          <Button label={'Instagram'} href={'#'}>
            <FaInstagram  color='red'/>
          </Button>
         
        </Stack>
        

    {/* footer column */}
    <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 6}} spacing={7}>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>The Artling</Heading>
            <Box as='a' color='#685253' href='#inner-link' > Art Consulatancy</Box>
            <Box as='a' color='#685253' href='#inner-link' > About us</Box>
            <Box as='a' color='#685253' href='#inner-link' > The Team</Box>
            <Box as='a' color='#685253' href='#inner-link' >Press</Box> 
            <Box as='a' color='#685253' href='#inner-link' > Careers</Box>
            <Box as='a' color='#685253' href='#inner-link' > Contact Us</Box>

           
           
          </Stack>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>Customer Care    </Heading>
            <Box as='a' color='#685253' href='#inner-link' > FAQs</Box>
            <Box as='a' color='#685253' href='#inner-link' > Shipping and Returns</Box>
            <Box as='a' color='#685253' href='#inner-link' > Terms Of use</Box>
            <Box as='a' color='#685253' href='#inner-link' >Privacy Policy</Box> 
            <Box as='a' color='#685253' href='#inner-link' > Buy a gift card</Box>
          
          </Stack>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>For Trade</Heading>
            <Box as='a' color='#685253' href='#inner-link' > Trade Program</Box>

          </Stack>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>Sell</Heading>
            <Box as='a' color='#685253' href='#inner-link' > Seller Guide</Box>
            <Box as='a' color='#685253' href='#inner-link' > Seller Resouces</Box>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>Discover</Heading>
            <Box as='a' color='#685253' href='#inner-link' > Art</Box>
            <Box as='a' color='#685253' href='#inner-link' > Design</Box>
            <Box as='a' color='#685253' href='#inner-link' > Prints</Box>
            <Box as='a' color='#685253' href='#inner-link' >Artist and Designers</Box> 
            <Box as='a' color='#685253' href='#inner-link' > Galleries</Box>
            <Box as='a' color='#685253' href='#inner-link' > Collections</Box>
            <Box as='a' color='#685253' href='#inner-link' > Events</Box>
          </Stack>
          <Stack align={'flex-start'}>
            <Heading fontSize={'xl'} color={"#1e0e00"}>Artzine</Heading>
            <Box as='a' color='#685253' href='#inner-link' > Art 101</Box>
            <Box as='a' color='#685253' href='#inner-link' > Design</Box> 
            <Box as='a' color='#685253' href='#inner-link' > Fetures and Interviews</Box>
            <Box as='a' color='#685253' href='#inner-link' > Artling Social</Box>
            <Box as='a' color='#685253' href='#inner-link' > Advisory Blog</Box> 
          </Stack>
        </SimpleGrid>
      </Container>

      </Box>
       
    )
  }
  
  export default Footer