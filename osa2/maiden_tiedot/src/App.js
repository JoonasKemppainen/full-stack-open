import { useState, useEffect } from 'react'
import countryServices from "./services/countries"
import weatherServices from "./services/weather"

const Search = ({value, onChange}) => {
  return (
    <form>
      find countries&nbsp;
      <input value={value} onChange={onChange} placeholder="write country name here" />
    </form>
  )
}

const Results = ({results, onClick}) => {
  return (
    <div>
      {results.map(country => {
        if (results.length <= 10 && results.length > 1) {
          return (
            <div key={country.name.common}>
            {country.name.common}&nbsp;
            <button name={country.name.common} onClick={onClick} >show</button>
            <br />
            </div>
          )
        } else {
          return <Result key={country.area} country={country} />
        }
      })}
    </div>
  )
}

const Result = ({country}) => {
  const [weather, setWeather] = useState({})
  useEffect(() => {
    weatherServices
    .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
    .then(response => {
      setWeather(response)
    }).catch(e => {
      console.log(e)
    })
  }, [country.capitalInfo.latlng])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p><strong>languages:</strong></p>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => <li key={value} >{value}</li>)}
      </ul>
      <img src={country.flags.png} alt="flag" />
      <h1>Weather in {country.capital}</h1>
      {weather.current_weather ? (
        <div>
          <p>temperature {weather.current_weather.temperature} Celsius</p>
          {/*tätä palvelua pystyi käyttämään ilman avainta mutta sivustolta ei löytynyt kuvia vastaamaan sääkoodeja, laitoin pelkän koodin alapuolelle*/}
          <p>weather code {weather.current_weather.weathercode}</p>
          <p>wind {(weather.current_weather.windspeed * 1000 / 3600).toFixed(2)} m/s</p>   
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

const App = () => {
  const [search, setSearch] = useState("")
  const [countries, setCountries] = useState([])
  const [results, setResults] = useState([])

  useEffect(() => {
    countryServices
    .getAll()
    .then(allCountries => {
      setCountries(allCountries)
    }).catch(e => {
      console.log(e)
    })
  }, [])

  const handleChange = (e) => {
    setSearch(e.target.value)
    setResults(countries.filter(country => 
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase()) ||
      country.name.official.toLowerCase().includes(e.target.value.toLowerCase())
    ))
  }

  const handleClick = (e) => {
    setSearch(e.target.name)
    setResults(countries.filter(country => 
      country.name.common.toLowerCase().includes(e.target.name.toLowerCase()) ||
      country.name.official.toLowerCase().includes(e.target.name.toLowerCase())
    ))
  }

  return (
    <div>
      <Search onChange={handleChange} value={search} />
      {results.length > 10 || results.length === 0 ? (
        "Too many, or too few matches, specify another filter"
      ) : (
        <Results results={results} onClick={handleClick} />
      ) 
      } 
    </div>
  )
}

export default App