import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css';
import rehypeRaw from 'rehype-raw';

const Home = () => {
  const [md, setMd] = useState<string>('');
  useEffect(() => {
    fetchData('readme.md')
      .then(data => setMd(data))
  }, [md])
  return (
    <ReactMarkdown
      className='markdown-body'
      children={md}
      rehypePlugins={[rehypeRaw]}
    />
  )
}

export default Home
