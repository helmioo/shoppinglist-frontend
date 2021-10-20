import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'

const URL = 'http://localhost/shopping-list/'

function App() {

  const [items, setItems] = useState([])
  const [item, setItem] = useState('')

  useEffect(() => {
    axios.get(URL)
    .then((response) => {
     // console.log(response.data);
      setItems(response.data)
    }).catch(error => {
      alert(error.response ? error.response.data.error : error)
    })
  }, [])

  function save(e) {
    e.preventDefault()
    const json = JSON.stringify({description:item})
    axios.post(URL + 'add.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data])
      setItem('')
    }).catch (error => {
      //console.log(error);
      alert(error.response.data.error)
    })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item => item.id !== id))
      setItems(newListWithoutRemoved)
    }).catch (error => {
      //console.log(error);
      alert(error.response ? error.response.data.error : error)
    })
  }

  return (
    <div className='container'>
    <h3>Shopping list</h3>
    <form onSubmit={save}>
      <label>New item</label>
      <input placeholder="Type description" value={item} onChange={e => setItem(e.target.value)}></input>
      <input placeholder="Type amount" value={item} onChange={e => setItem(e.target.value)}></input>
      <button>Add</button>
    </form>
   <ul>
      {items?.map(item => (
        <li key={item.id}>
          {item.description}
          {item.amount}
      <a href="#" className="delete" onClick={() => remove(item.id)}>
        Delete
      </a>
      </li>
      ))}
   </ul>
  </div>
  );
}

export default App;
