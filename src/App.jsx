import React from 'react'
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { marked } from 'marked'
import './App.css'

function ContentPage({ isCode, language, title, content }) {
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    if (content && contentRef.current && isCode) {
      Prism.highlightElement(contentRef.current)
    }
  }, [content, isCode, language])

  const renderedContent = isCode
    ? <pre className="">
        <code ref={contentRef} className={`language-${language}`}>
          {content}
        </code>
      </pre>
    : <div dangerouslySetInnerHTML={{ __html: marked(content) }} />
  // const renderedContent = isCode
  //   ? <SyntaxHighlighter language="javascript" style={vs}>
  //       {content}
  //     </SyntaxHighlighter>
  //   : <div className="markdown-content" dangerouslySetInnerHTML={{ __html: marked(content) }} />

  return (
    <div className="flex-1 px-6 py-24 sm:py-32 lg:px-8 bg-red-50">
      <div className="mx-auto max-w-7xl">
        <div>
          {isCode ? (
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-green-600">
                Problem Solving:
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">
                {title}
              </h1>
            </div>
          ) : (
            <div>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {title}
              </h1>
            </div>
          )}
        </div>

        <div className="mt-8">
          {renderedContent}
        </div>
      </div>
    </div>
  )
}

function App() {
  const [code, setCode] = React.useState(null)
  const [note, setNote] = React.useState(null)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    Promise.all([
      fetch('/api/code').then(res => res.json()),
      fetch('/api/note').then(res => res.json()),
    ])
      .then(([codeData, noteData]) => {
        setCode(codeData.content)
        setNote(noteData.content)
      })
      .catch(err => {
        console.error('Error fetching data:', err)
        setError('Error loading content')
      })
  }, [])

  if (error) {
    return <div>{error}</div>
  }

  if (code === null || note === null) {
    return <div>loading...</div>
  }

  return (
    <div className="flex">
      <ContentPage
        title="Minimum Absolute Difference in an Array"
        content={code}
        isCode={true}
        language="javascript"
      >
      </ContentPage>
      <ContentPage
        title="Notes"
        content={note}
        isCode={false}
      >
      </ContentPage>
    </div>
  )
}

export default App
