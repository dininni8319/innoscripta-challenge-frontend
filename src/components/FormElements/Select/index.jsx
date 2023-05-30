const SelectSource = ({ sources, handleFilteredBySource, text }) => {
  return (
    <select onChange={handleFilteredBySource} className="class-input-style">
      <option defaultValue>Please select {text}</option>
      {sources?.map((source, id) => {
        return (
          <option value={source} key={source || id}>
            {source}
          </option>
        )
      })}
    </select>
  )
}

export default SelectSource
