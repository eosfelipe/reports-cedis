import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const INITIAL_STATE = {
  date: new Date().toLocaleString(),
  applicant: '',
  attended: '',
  type: '',
  problem: '',
  solution: ''
}

const Add = () => {
  const history = useHistory()
  const [data, setData] = useState(INITIAL_STATE)

  const { date, aplicant, attended, type, problem, solution } = data

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(process.env.REACT_APP_URL_SHEETS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([[date, aplicant, attended, problem, solution]])
      })
      await res.json()
      setData({
        ...data,
        date: new Date().toLocaleString(),
        aplicant: '',
        attended: '',
        type: '',
        problem: '',
        solution: ''
      })
      if (res.ok) {
        history.replace('/')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      style={{
        maxWidth: 500,
        margin: 'auto',
        marginTop: '4rem',
        paddingBottom: '2rem'
      }}
      onSubmit={handleSubmit}
    >
      <h1 className="text-muted text-center">Nuevo reporte</h1>
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
          autoComplete="off"
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
          autoComplete="off"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="type" className="form-label">
          Tipo
        </label>
        <select
          name="type"
          className="form-select"
          aria-label="Default select"
          onChange={handleChange}
        >
          <option defaultChecked>Seleccionar</option>
          <option value="operativo">Operativo</option>
          <option value="sistema">Sistema</option>
        </select>
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
        <button className="btn btn-primary">Aceptar</button>
      </div>
    </form>
  )
}

export default Add
