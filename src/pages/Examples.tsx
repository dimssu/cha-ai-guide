import ExamplesHeader from '../components/ExamplesComponents/ExamplesHeader'
import ExamplesGrid from '../components/ExamplesComponents/ExamplesGrid'
import ExamplesFooter from '../components/ExamplesComponents/ExamplesFooter'
import './Examples.scss'

const Examples = () => {
  return (
    <div className="examples">
      <div className="container">
        <ExamplesHeader />
        <ExamplesGrid />
        <ExamplesFooter />
      </div>
    </div>
  )
}

export default Examples 