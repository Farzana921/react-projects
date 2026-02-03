import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountryCard from "./components/CountryCard";
import "./App.css";

const REGIONS = ["all", "Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

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
          url = `https://restcountries.com/v3.1/region/${encodeURIComponent(
            region
          )}`;
        }

        const res = await fetch(url, { signal: controller.signal });

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
        // Ignore AbortError (happens when user types fast / effect re-runs)
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();

    // Cleanup: cancel the request if effect re-runs or component unmounts
    return () => controller.abort();
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
      {/* HEADER */}
      <motion.div
        className="header"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Countries Explorer
          </motion.h1>

          <motion.p
            className="subtitle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.08 }}
          >
            Search and filter countries using the REST Countries API
          </motion.p>
        </div>
      </motion.div>

      {/* CONTROLS */}
      <motion.div
        className="controls"
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        <motion.input
          className="input"
          type="text"
          placeholder="Search by country name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        />

        <motion.select
          className="select"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </motion.select>

        <motion.button
          className="button"
          onClick={handleClearFilters}
          disabled={!search && region === "all"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          variants={{
            hidden: { opacity: 0, y: 10 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
        >
          Clear filters
        </motion.button>
      </motion.div>

      {/* BADGES */}
      <motion.div
        className="badgeRow"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <span className="badge">
          🌍 Region: <strong>{region}</strong>
        </span>
        <span className="badge">
          🔍 Search: <strong>{search || "—"}</strong>
        </span>
        <span className="badge">
          📦 Results: <strong>{countries.length}</strong>
        </span>
      </motion.div>

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
      <AnimatePresence mode="popLayout">
        {!loading && !error && countries.length > 0 && (
          <motion.div className="grid" layout>
            {countries.map((country) => (
              <CountryCard
                key={country?.cca3 || country?.name?.common}
                country={country}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
