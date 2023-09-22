import React from 'react';
import PropTypes from 'prop-types';
import styles from './Cell.module.css';

export const Cell = ({ value, onClick }) => {
	return (
		<div className={styles.cell} onClick={onClick}>
			{value}
		</div>
	);
};

Cell.propTypes = {
	value: PropTypes.string,
	onclick: PropTypes.func,
};

export default Cell;
