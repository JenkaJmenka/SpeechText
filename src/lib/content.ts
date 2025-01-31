const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  return fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => data.content)
    .catch((error) => "<speak><s>There was an error</s></speak>");
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  
  const sentences = content.match(/<s>(.*?)<\/s>/g);
  if (!sentences) { 
    throw new Error('This is not valid ssml');
  }
  return sentences?.map(sentence => sentence.replace(/<\/?s>/g, ''));
};

export { fetchContent, parseContentIntoSentences };

