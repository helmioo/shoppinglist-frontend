import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import uuid from 'react-uuid'

const URL = 'http://localhost/shopping-list/'

function App() {

  const [items, setItems] = useState([])
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')

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
    const json = JSON.stringify({description:description, amount:amount})
    axios.post(URL + 'add.php', json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      setItems(items => [...items,response.data])
      setDescription('')
      setAmount('')
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
      <input placeholder="Type description" value={description} onChange={e => setDescription(e.target.value)}></input>
      <input placeholder="Type amount" value={amount} onChange={e => setAmount(e.target.value)}></input>
      <button>Add</button>
    </form>
   <table>
     <tbody>
      {items?.map(item => (
        <tr key={uuid()}>
          <td>{item.description}</td>
          <td>{item.amount}</td>
          <td><a href="#" className="delete" onClick={() => remove(item.id)}>
              Delete
              </a>
          </td>
      </tr>
      ))}
      </tbody>
   </table>
  </div>
  );
}

export default App;
