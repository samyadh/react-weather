function Select({ id, value, onSelectChange, options, props }) {
  return (
    options.length &&
    onSelectChange && (
      <select
        id={id}
        value={value}
        onChange={(event) => {
          onSelectChange(event.target.value);
        }}
      >
        {options.map((mOption) => (
          <option value={mOption.value} key={mOption.value}>
            {mOption.label}
          </option>
        ))}
      </select>
    )
  );
}

export default Select;
