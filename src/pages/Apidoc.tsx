import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import { getRequestUrl } from '../utils/fetchData'

const Apidoc = () => {
  return (
    <div className='container'>
      <SwaggerUI url={getRequestUrl('swagger.json')} />
    </div>
  )
}

export default Apidoc
