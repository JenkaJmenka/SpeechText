/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {
  const [startWordIdx, endWordIdx] = currentWordRange;
  const currentSentence = sentences[currentSentenceIdx] || '';
  const leftSentencePart = currentSentence.slice(0, startWordIdx);
  const rightSentencePart = currentSentence.slice(endWordIdx);
  const currentWord = currentSentence.slice(startWordIdx, endWordIdx)

  return (<div className="currently-reading" data-testid="currently-reading">
    <p className="currently-reading-text" data-testid="current-sentence">
      {leftSentencePart}
      <span className="current-word" data-testid="current-word">
        {currentWord}
      </span>
      {rightSentencePart}
    </p>
    <br />
    {sentences.join(' ')}
  </div>);
};
