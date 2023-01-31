import { marked } from 'marked';
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';

const Home = () => {
  const [md, setMd] = useState<string>('');
  useEffect(() => {
    fetchData('readme.md')
      .then(data => setMd(marked.parse(data)))
  }, [md])
  return (
    <div className='container py-3'>
      <div dangerouslySetInnerHTML={{__html: md}}></div>
    </div>
  )
}

export default Home
