import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const dispatch = useDispatch()
  
    const filter = (e) => {
      e.preventDefault()
      const filter = e.target.value
      dispatch(setFilter(filter))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          filter <input onChange={filter} />
        </form>
      </div>
    )
}

export default Filter