import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import "./App.css";

const REGIONS = ["all", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function App() {
  // ✅ Mandatory state
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  // For Retry button
  const [retryKey, setRetryKey] = useState(0);

  async function fetchCountries() {
    setLoading(true);
    setError(null);

    try {
      const s = search.trim();

      // Optional: only search if length >= 2
      const shouldSearch = s.length >= 2;

      let url = "https://restcountries.com/v3.1/all";

      if (shouldSearch) {
        url = `https://restcountries.com/v3.1/name/${encodeURIComponent(s)}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${encodeURIComponent(region)}`;
      }

      const res = await fetch(url);

      // If searching by name and nothing found, API returns 404
      if (!res.ok) {
        if (res.status === 404) {
          setCountries([]);
          return;
        }
        throw new Error(`Request failed (${res.status})`);
      }

      const data = await res.json();
      const list = Array.isArray(data) ? data : [];

      // If BOTH search and region are used: filter client-side by region
      const filtered =
        shouldSearch && region !== "all"
          ? list.filter(
              (c) => (c?.region ?? "").toLowerCase() === region.toLowerCase()
            )
          : list;

      setCountries(filtered);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // ✅ Mandatory: useEffect with dependency array [search, region]
  useEffect(() => {
    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <h1>Countries Explorer</h1>

      {/* ✅ UI Controls (Mandatory) */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={region} onChange={(e) => setRegion(e.target.value)}>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <button onClick={handleClearFilters}>Clear filters</button>
      </div>

      {/* ✅ Loading + Error UI (Mandatory) */}
      {loading && <p>Loading countries...</p>}

      {error && (
        <div className="errorBox">
          <p>Error: {error}</p>
          <button onClick={handleRetry}>Retry</button>
        </div>
      )}

      {/* ✅ Countries List UI (Mandatory) */}
      {!loading && !error && countries.length === 0 && (
        <p>No results found.</p>
      )}

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
}
