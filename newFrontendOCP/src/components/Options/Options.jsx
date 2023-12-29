/* eslint-disable react/prop-types */
import React from 'react';

const Option = ({ index, value, updateOption,removeOption }) => {
  return (
    <div>
      <label>
        Option {index + 1}:
        <input
          type="text"
          value={value}
          onChange={(e) => updateOption(index, e.target.value)}
        />
      </label>
      <button onClick={() => removeOption(index)}>-</button>
    </div>
  );
};

export default Option;
