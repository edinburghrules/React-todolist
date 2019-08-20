import React from 'react';

const Search = (props) => {
  return (
    <div>
      <input 
        placeholder="Search todos"
        onChange={props.setSearchText}
      />
    </div>

  )
}
  




export default Search;