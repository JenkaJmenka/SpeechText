import { useRef, useState } from 'react';

import { PlayingState, SpeechEngine, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.
  
  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);

  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const onSentenceEncRef = useRef(() => {});
  onSentenceEncRef.current = () => {
    if (currentSentenceIdx === sentences.length - 1) {
      setCurrentSentenceIdx(0);
      setCurrentWordRange([0,0]);
      return;
    }
    const nextSentenceIdx = currentSentenceIdx + 1;
    speechEngine.load(sentences[nextSentenceIdx]);
    speechEngine.play();
    setCurrentSentenceIdx(nextSentenceIdx);
  }

  const speechEngine: SpeechEngine = createSpeechEngine({
    onBoundary: (e: SpeechSynthesisEvent) => {
      setCurrentWordRange([e.charIndex, e.charIndex + e.charLength]);
    },
    onEnd:(e: SpeechSynthesisEvent) => {
      onSentenceEncRef.current();
    },
    onStateUpdate: (state: PlayingState) => {
      console.log(state)
      setPlaybackState(state)
    }
  })

  const play = () => {
    speechEngine.load(sentences[currentSentenceIdx]);
    speechEngine.play();
  };
  const pause = () => {
    speechEngine.pause();
  };

  return {
    currentSentence: currentSentenceIdx,
    currentWord: currentWordRange,
    playbackState,
    play,
    pause,
  };
};

export { useSpeech };

