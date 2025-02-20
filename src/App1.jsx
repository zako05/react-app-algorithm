import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import './App.css';

const algorithm = {
  title: 'Problem solving:',
  name: 'Minimum Absolute Difference in an Array',
};

function ContentPane({ title, content, isCode, language }) {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (content && contentRef.current && isCode) {
      Prism.highlightElement(contentRef.current);
    }
  }, [content, isCode, language]);

  return (
    <div className="relative isolate overflow-hidden bg-red-50 px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">{title}</h1>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              {isCode ? (
                <pre>
                  <code ref={contentRef} className={`language-${language}`}>
                    {content}
                  </code>
                </pre>
              ) : (
                <p>{content}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function App() {
  const [code, setCode] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    Promise.all([
      fetch('/api/code').then(res => res.json()),
      fetch('/api/note').then(res => res.json()),
    ])
      .then(([codeData, noteData]) => {
        setCode(codeData.content);
        setNote(noteData.content);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setError("Error loading content. Please try again later.");
      })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (code === null || note === null) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex">
      <ContentPane title={algorithm.name} content={code} isCode={true} language="javascript" />
      <ContentPane title="Note" content={note} isCode={false} />
    </div>
  );
}

export default App;
