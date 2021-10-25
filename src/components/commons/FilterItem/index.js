/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import Text from '../../foundation/Text';

export default function FilterItem({ filter, handleFilter }) {
  return (
    <>
      <button
        onClick={handleFilter}
        type="button"
      >
        <figure className={`filter-${filter}`}>
          <img
            src="https://picturepan2.github.io/instagram.css/assets/img/instagram.jpg"
            width="88px"
            height="88px"
            alt={filter}
          />
        </figure>
        <Text
          tag="span"
          variant="smallestException"
          color="tertiary.light"
        >
          {filter}
        </Text>
      </button>
    </>
  );
}

FilterItem.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};
