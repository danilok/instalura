import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import filters from './filters';
import FilterItem from '../FilterItem';

const Filters = styled.section`
  height: 140px;
  display: flex;
  overflow: overlay;
  position: relative;
  filter: drop-shadow(0 0 10px #0003);
  perspective: 100px;
  margin-bottom: 15px;
`;

Filters.List = styled.ol`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-x: scroll;
  counter-reset: item;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  list-style: none;
  margin: 0;
  padding: 0;

  &::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #D7385E;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  li {
    position: relative;
    width: 100px;
    height: 120px;
    padding-right: 16px;

    &:hover,
    &:focus {
      opacity: .5;
    }
  }

  button {
    border: 0;
    background-color: transparent;
    width: 100px;
    height: 112px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  button > figure {
    width: 88px;
    height: 88px;
    margin: 0;
    padding: 0;
  }
`;

export default function FiltersSlider({ imageUrl, handleFilter }) {
  return (
    <Filters>
      <Filters.List>
        {filters.map((filter) => (
          <li key={filter} data-filter={filter}>
            <FilterItem
              filter={filter}
              imageUrl={imageUrl}
              handleFilter={handleFilter}
            />
          </li>
        ))}
      </Filters.List>
    </Filters>
  );
}

FiltersSlider.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  imageUrl: PropTypes.string.isRequired,
};
