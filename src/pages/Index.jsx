// Complete the Index page component here
// Use chakra-ui
import { useState } from "react";
import { Box, Button, Container, Text, Textarea, VStack } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { create } from "../../lib/openai";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSendPrompt = async () => {
    if (!prompt) return;

    const messages = [{ role: "user", content: prompt }];
    const apiResponse = await create({ messages, model: "gpt-3.5-turbo" });
    setResponse(apiResponse.data.choices[0].message.content);
  };

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={5}>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold">
            GPT-3.5 Turbo Interaction
          </Text>
          <Text color="gray.500">Enter your prompt and get a response from AI</Text>
        </Box>
        <Textarea placeholder="Enter your prompt here..." value={prompt} onChange={handleInputChange} size="lg" />
        <Button leftIcon={<FaRobot />} colorScheme="blue" onClick={handleSendPrompt} isDisabled={!prompt}>
          Send Prompt
        </Button>
        <Box w="full" p={4} borderWidth="1px" borderRadius="lg">
          <Text fontWeight="bold">AI Response:</Text>
          <Text mt={2}>{response || "No response yet. Enter a prompt and click 'Send Prompt'."}</Text>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;
