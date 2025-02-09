  async function sendChatToOpenAI(messages, question, temperature = 0.7) {

    const API_URL = 'https://api.openai.com/v1/chat/completions';
  
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('openai_api_key')}`,
    });
  
    const requestBody = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'user',
          content:
            'The following is a 100 lines from a Twitch chat answering the question: "' +
            question +
            '" | Format the answers and present back the top 10 answers in an HTML table that covers the user, their reply, your rating of their comment, and a small review that roasts their reply. Here are the chat logs:' +
            messages,
        },
      ],
      temperature: temperature,
    });
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: requestBody,
      });
  
      if (response.ok) {
        const data = await response.json();
        const openAIResponse = data.choices[0].message.content;
        displayOpenAIResponse(openAIResponse);
        return data;
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error while sending chat data to OpenAI: ${error}`);
    }
  }
  
  function displayOpenAIResponse(response) {
    const responseElement = document.getElementById('openai-response');
  
    if (responseElement) {
      responseElement.innerHTML = response;
    } else {
      console.error('Unable to find the HTML element with the ID "openai-response"');
    }
  }
  