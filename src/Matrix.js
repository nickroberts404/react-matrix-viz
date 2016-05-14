import React, { Component, PropTypes } from 'react';
import { extend } from 'lodash';
import { matrixStyle, cellStyle } from './Styles.js';
import Column from './Column.js';
import Cell from './Cell.js';

export default class Matrix extends Component {
	
	getCellStyle(data) {
		var { setStyle, setHoverStyle } = this.props;
		var style = extend({}, cellStyle);
		if(setStyle) style = extend(style, setStyle(data));
		if(setHoverStyle) style = extend(style, setHoverStyle(data));
		return style;
	}

	generateCells() {
		var { data, cellData, cellClass, onClick, onMouseOver, onMouseOut} = this.props;
		return data.map((col, i) => col.map((cell, j) => {
			var curData = cellData(cell, i, j) // Using i and j to denote col and row respectively
			var style = this.getCellStyle(curData);
			return (<Cell 
				key={`col${i}row${j}`} 
				className={cellClass}
				data={curData}
				style={style}
				onClick={onClick}
				onMouseOver={onMouseOver}
				onMouseOut={onMouseOut} />);
		}));
	}

	render() {
		var { columnClass, matrixClass } = this.props;
		var cells = this.generateCells();
		return (
			<div className={matrixClass} style={matrixStyle}>
				{cells.map((col, i) => <Column key={`col${i}`} className={columnClass} cells={col} />)}
			</div>
		);
	}
}

Matrix.propTypes = {
	data: PropTypes.array.isRequired, // A 2d array of values or objects
	cellData: PropTypes.func, // A function that determines what the cell's value will be
	setStyle: PropTypes.func, // A function that determines the cell's style
	setHoverStyle: PropTypes.func, // A function that determines the cell's style
	onClick: PropTypes.func, // An event handler, triggered when cell is clicked
	onMouseOver: PropTypes.func, // An event handler, triggered when mouse enters cell
	onMouseOut: PropTypes.func, // An event handler, triggered when mouse exits cell
	cellClass: PropTypes.string,
	columnClass: PropTypes.string,
	matrixClass: PropTypes.string,
};

Matrix.defaultProps = {
	cellData: (cell, col, row) => cell, // Returns the value at data[col][row]
	cellClass: 'rm-cell', // Default cell class name to 'rm-cell'
	columnClass: 'rm-column', // Default column class name to 'rm-column'
	matrixClass: 'rm-matrix', // Default matrix class name to 'rm-matrix'
};

