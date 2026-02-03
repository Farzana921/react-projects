import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import "./App.css";


const REGIONS = ["all", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function App() {
  //state
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const [retryKey, setRetryKey] = useState(0);

  async function fetchCountries() {
    setLoading(true);
    setError(null);

    try {
      const s = search.trim();
      const shouldSearch = s.length >= 2;

      let url = "https://restcountries.com/v3.1/all";

      if (shouldSearch) {
        url = `https://restcountries.com/v3.1/name/${encodeURIComponent(s)}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`;
      }

      const res = await fetch(url);

      if (!res.ok) {
        if (res.status === 404) {
          setCountries([]);
          return;
        }
        throw new Error("Failed to fetch countries");
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      const filtered =
        shouldSearch && region !== "all"
          ? list.filter(
              (c) =>
                (c?.region ?? "").toLowerCase() === region.toLowerCase()
            )
          : list;

      setCountries(filtered);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  //useEffect
  useEffect(() => {
    fetchCountries();
 
  }, [search, region, retryKey]);

  function handleRetry() {
    setRetryKey((k) => k + 1);
  }

  function handleClearFilters() {
    setSearch("");
    setRegion("all");
  }

  return (
    <div className="container">
      {/*HEADER */}
      <div className="header">
        <div>
          <h1>Countries Explorer</h1>
          <p className="subtitle">
            Search and filter countries using the REST Countries API
          </p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls">
        <input
          className="input"
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button className="button" onClick={handleClearFilters}>
          Clear filters
        </button>
      </div>

      {/* STATUS BADGES */}
      <div className="badgeRow">
        <span className="badge">🌍 Region: <strong>{region}</strong></span>
        <span className="badge">
           Search: <strong>{search || "—"}</strong>
        </span>
        <span className="badge">
           Results: <strong>{countries.length}</strong>
        </span>
      </div>

      {/* STATES */}
      {loading && (
        <div className="stateBox">
          <p>Loading countries...</p>
        </div>
      )}

      {error && (
        <div className="stateBox">
          <p>Error: {error}</p>
          <button className="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <div className="stateBox">
          <p>No results found.</p>
        </div>
      )}

      {/* GRID */}
      {!loading && !error && countries.length > 0 && (
        <div className="grid">
          {countries.map((country) => (
            <CountryCard
              key={country?.cca3 || country?.name?.common}
              country={country}
            />
          ))}
        </div>
      )}
    </div>
  );
  {loading && (
  <div className="grid">
    {Array.from({ length: 8 }).map((_, i) => (
      <div className="card skeleton" key={i}>
        <div className="flag skeletonBox" />
        <div className="cardBody">
          <div className="skeletonLine" />
          <div className="skeletonLine small" />
          <div className="skeletonLine small" />
        </div>
      </div>
    ))}
  </div>
)}

}
