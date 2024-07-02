import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);
  const { currentWord, currentSentence, play, pause,  playbackState } = useSpeech(sentences);

  const loadContent = () => {
    fetchContent()
      .then((response) => {
        setSentences(parseContentIntoSentences(response));
      })
      .catch(error => console.error('Something went wrong during loading text', error))
  }

  useEffect(() => {
    loadContent();
  }, [])

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading currentSentenceIdx={currentSentence} currentWordRange={currentWord} sentences={sentences} />
      </div>
      <div>
        <Controls play={play} pause={pause} loadNewContent={loadContent} state={playbackState}/>
      </div>
    </div>
  );
}

export default App;
