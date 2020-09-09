import React from 'react';

export function SearchBar({getValueForSearch}){

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const form = evt.target;
    const formData = new FormData(evt.target)
    formData.forEach((value,name) => {
      getValueForSearch(value)
    })
    form.reset() 
  }

  return (
    <>
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name='search'
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
    </>
  )
}