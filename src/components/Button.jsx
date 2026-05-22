import React from 'react';

const Button = ({text, onClick, type = "primary", disabled = false }) => {
	const buttonClass = `custom-button ${type}`;

	return (
		<button
			className={buttonClass}
			onClick={onClick}
			disabled={disabled}
		>
			{text}
		</button>
		);
};