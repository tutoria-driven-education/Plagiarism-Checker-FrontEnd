import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyles } from "./assets/styles/global";
import Navbar from "./components/Navbar/Navbar";
import { ReportsContextProvider } from "./hooks/context/ReportsContext";
import { SidebarContextProvider } from "./hooks/context/SidebarContext";

import Home from "./pages/home";
import Reports from "./pages/reports/Reports";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <SidebarContextProvider>
        <ReportsContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route index element={<Home />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </BrowserRouter>
        </ReportsContextProvider>
      </SidebarContextProvider>
    </>
  );
};

export default App;
