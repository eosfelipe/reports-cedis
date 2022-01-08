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
          <h2 className="accordion-header" id={`heading${i}`}>
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${i}`}
              aria-expanded="true"
              aria-controls={`collapse${i}`}
            >
              {item.fecha}
              {console.log(item)}
            </button>
          </h2>
          <div
            id={`collapse${i}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${i}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <div className="d-flex justify-content-between align-items-center">
                <span>
                  <strong className="display-6">{item.solicitante}</strong> ---{' '}
                  {item.problema}
                </span>
                <span>
                  <button
                    className="btn btn-sm btn-danger ms-1"
                    onClick={() => handleDelete(i)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
