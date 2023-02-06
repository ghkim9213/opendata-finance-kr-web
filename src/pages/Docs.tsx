import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { fetchData, getRequestUrl } from '../utils/fetchData'
import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import rehypeRaw from 'rehype-raw';

const Docs = () => {
  useEffect(() => {
    hljs.initHighlightingOnLoad();
  })
  const [activeApi, setActiveApi] = useState<boolean>(false);
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setActiveApi(Boolean(params.get('api')));
  }, []);
  const [clientDoc, setClientDoc] = useState<string>('');
  useEffect(() => {
    fetchData('readme4client.md')
      .then(data => setClientDoc(data))
  }, [])
  const clientTabClassName = activeApi ? 'nav-link': 'nav-link active';
  const apiTabClassName = activeApi ? 'nav-link active': 'nav-link';
  const clientDocClassName = activeApi ? 'tab-pane fade': 'tab-pane fade show active';
  const apiDocClassName = activeApi ? 'tab-pane fade show active': 'tab-pane fade';
  return (
    <div className='container'>
      <ul className='nav nav-tabs' role='tablist'>
        <li className='nav-item' role='presentation'>
          <button
            className={clientTabClassName}
            id='client-tab'
            data-bs-toggle='tab'
            data-bs-target='#client-doc'
            type='button'
            aria-controls='client-tab'
            aria-selected={`${!activeApi}`}
          >Client</button>
        </li>
        <li>
          <button
            className={apiTabClassName}
            id='api-tab'
            data-bs-toggle='tab'
            data-bs-target='#api-doc'
            type='button'
            aria-controls='api-tab'
            aria-selected={`${activeApi}`}
          >API</button>
        </li>
      </ul>
      <div className='tab-content'>
        <div
          className={clientDocClassName}
          id='client-doc'
          role='tabpanel'
          aria-labelledby='client-tab'
          tabIndex={0}
        >
          <ReactMarkdown
            className='markdown-body'
            children={clientDoc}
            rehypePlugins={[rehypeRaw]}
            />
        </div>
        <div
          className={apiDocClassName}
          id='api-doc'
          role='tabpanel'
          aria-labelledby='api-tab'
          tabIndex={0}
        >
          <SwaggerUI url={getRequestUrl('swagger.json')} />
        </div>
      </div>
    </div>
  )
}

export default Docs
