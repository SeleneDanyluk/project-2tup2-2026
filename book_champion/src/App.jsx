import './App.css'
import BookItem from './components/bookItem/BookItem'

function App() {
  
  const titulo = "Cien años de soledad" 
  
  return (
    <>
      <h1>Book Champions!</h1>
      <h3>Libros!</h3>
      <BookItem title={titulo}/>
    </>
  )
}

export default App