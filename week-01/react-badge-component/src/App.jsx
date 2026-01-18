import Badge from "./components/Badge";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Week 1 : Reusable React Component</h1>

      <div style={{ marginTop: "20px" }}>
        <Badge label="Course" value="React" />
        <Badge label="Week" value={1} />
        <Badge label="Topic" value="Props" />
        <Badge label="Status" value="Completed" />
      </div>
    </div>
  );
}

export default App;
