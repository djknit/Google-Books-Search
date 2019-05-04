import React from 'react';

export default ({
  id,
  name,
  placeholder,
  value,
  handleChange,
  disabled,
  label
}) => {

  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control has-icons-left">
        <input
          id={id}
          className="input has-shadow"
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </div>
    </div>
  );
};