import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const INITIAL_STATE = {
  date: new Date().toLocaleString(),
  applicant: '',
  attended: '',
  problem: '',
  solution: ''
}

const Edit = () => {
  const history = useHistory()
  const { rowIndex } = useParams()
  const [data, setData] = useState(INITIAL_STATE)

  const { date, aplicant, attended, problem, solution } = data

  const getData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_URL_SHEETS}/${rowIndex}`)
      const data = await res.json()
      setData(data[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL_SHEETS}/${rowIndex}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([[date, aplicant, attended, problem, solution]])
        }
      )
      if (res.ok) {
        history.replace('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form style={{ maxWidth: 500, margin: 'auto' }} onSubmit={handleSubmit}>
      <h1 className="text-muted text-center">Update</h1>
      <div className="mb-3">
        <label htmlFor="aplicant" className="form-label">
          Solicitante
        </label>
        <input
          type="text"
          className="form-control"
          name="aplicant"
          value={aplicant || ''}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="attended" className="form-label">
          Atendió
        </label>
        <input
          type="text"
          className="form-control"
          name="attended"
          value={attended}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="problem" className="form-label">
          Problema
        </label>
        <textarea
          name="problem"
          cols="30"
          rows="3"
          className="form-control"
          value={problem}
          onChange={handleChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="solution" className="form-label">
          Solución
        </label>
        <textarea
          name="solution"
          cols="30"
          rows="3"
          className="form-control"
          value={solution}
          onChange={handleChange}
        />
      </div>
      <div className="text-center">
        <button className="btn btn-info">Update</button>
      </div>
    </form>
  )
}

export default Edit
