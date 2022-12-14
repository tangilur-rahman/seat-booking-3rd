// external components
import { createContext, useContext, useState } from "react";

const rootContext = createContext(null);

const ContextHandler = ({ children }) => {
	// for updating generate-report
	const [updateReport, setUpdateReport] = useState("");

	return (
		<>
			<rootContext.Provider value={{ updateReport, setUpdateReport }}>
				{children}
			</rootContext.Provider>
		</>
	);
};

export const GetContextApi = () => {
	return useContext(rootContext);
};

export default ContextHandler;
