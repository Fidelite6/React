import React from 'react';
import classes from './Button.module.css';
import PropTypes from 'prop-types';

const button = (props) => {
  return (
    <button
      className={[classes.Button, classes[props.btnType]].join(' ')}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

button.propTypes = {
  btnType: PropTypes.string.isRequired,
}

export default button;
