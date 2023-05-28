const SelectSource = ({ sources, handleFilteredBySource, text }) => {
  
  return (
    <select onChange={handleFilteredBySource} className="class-input-style">
      <option selected>Please select {text}</option>
      {sources?.map((source) => {
        return (
          <option value={source} key={source}>
            {source}
          </option>
        )
      })}
    </select>
  )
}


export default SelectSource