import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
  const [data, setData] = useState()

  const getData = async () => {
    try {
      const res = await fetch(process.env.REACT_APP_URL_SHEETS)
      const { data } = await res.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleDelete = async (rowIndex) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_URL_SHEETS}/${rowIndex}`,
        {
          method: 'DELETE'
        }
      )
      if (res.ok) {
        const updatedData = data.filter((_, i) => i !== rowIndex)
        setData(updatedData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="accordion"
      id="accordionExample"
      style={{ marginTop: '4rem', paddingBottom: '2rem' }}
    >
      {data?.map((item, i) => (
        <div className="accordion-item" key={i}>
          <div className="accordion-header" id={`heading${i}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${i}`}
              aria-expanded="true"
              aria-controls={`collapse${i}`}
            >
              <span
                className={`badge bg-${
                  item.tipo === 'operativo' ? 'danger' : 'info'
                }`}
              >
                {item.tipo}
              </span>
              &nbsp;
              {item.fecha}
              {console.log(item)}
            </button>
          </div>
          <div
            id={`collapse${i}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${i}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex flex-column">
                <p className="fw-bold">{item.solicitante}</p>
                <p className="lead">{item.problema}</p>
                <p className="lead">{item.solucion}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
