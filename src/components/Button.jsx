import React from 'react';

const MyButton = () => {
	cosnt [count, setCount] = useState(0);

	return (
		<button onClick={() => setCount(count + 1)}>
			Clicks: {count}
		</button>
		);
};

export default MyButton;