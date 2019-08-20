import React from 'react';

const Search = (props) => {
  return (
    <div className="search-form">
      <input
        className="search-form__input" 
        placeholder="Search todos"
        onChange={props.setSearchText}
      />
    </div>

  )
}
  
export default Search;