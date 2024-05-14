import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";

const ChatBotComponent = () => {
  const steps = [
    {
      id: "0",
      message: "Welcome to the The Artling ",
      trigger: "1",
    },
    {
      id: "1",
      message: "Please provide your good name?",
      trigger: "2",
    },
    {
      id: "2",
      user: true,
      trigger: "3",
    },
    {
      id: "3",
      message: "Hi {previousValue}, how can I help you?",
      trigger: "4",
    },
    {
      id: "4",
      options: [
        { value: 1, label: "Issues in Login/SignUp", trigger: "5" },
        { value: 2, label: "Problem in Chatting", trigger: "6" },
        { value: 3, label: "Want to buy Art?", trigger: "9" },
      ],
    },
    {
      id: "5",
      options: [
        { value: 1, label: "Sign In Issue?", trigger: "6" },
        { value: 2, label: "Sign Up Issue?", trigger: "6" },
      ],
    },
    {
      id: "6",
      message: "Kindly explain the problem faced in brief.",
      trigger: "7",
    },
    {
      id: "7",
      user: true,
      trigger: "8",
    },
    {
      id: "8",
      message: "Will get back to you soon with solution.",
      trigger: "10",
    },
    {
      id: "9",
      message:
        "Please login with user and choose your favourite Art > Click on Add To Cart Button > do payment with desire payment method",
      trigger: "10",
    },
    {
      id: "10",
      message: "Any further enquiries?",
      trigger: "11",
    },
    {
      id: "11",
      options: [
        { value: 1, label: "Yes", trigger: "4" },
        { value: 2, label: "No", trigger: "12" },
      ],
    },
    {
      id: "12",
      message: "Good Bye",
      end: true,
    },
  ];

  const theme = {
    background: "#faf8f4",
    headerBgColor: "#b79b54",
    headerFontSize: "20px",
    botBubbleColor: "#4299E1",
    headerFontColor: "black",
    botFontColor: "white",
    userBubbleColor: "#b79b54",
    userFontColor: "white",
  };

  const config = {
    headerTitle: "Connect us",
    floating: true,
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ChatBot steps={steps} {...config} />
      </ThemeProvider>
    </div>
  );
};

export default ChatBotComponent;
