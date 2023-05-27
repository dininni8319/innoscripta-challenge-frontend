const SelectSource = ({ sources, handleFilteredBySource }) => {
  return (
    <select onChange={handleFilteredBySource} className="class-input-style">
      <option selected>Please select a source</option>
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