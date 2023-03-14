import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { Routes, Route, Link } from "react-router-dom"

const App = () => {
  const style = {
    paddingRight: 10
  }

  return (
    <div>
      <Link style={style} to="/">authors</Link>
      <Link style={style} to="/books">books</Link>
      <Link style={style} to="/add">add book</Link>
      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
