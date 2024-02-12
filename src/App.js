import "./App.css";
// import { Theme } from "@radix-ui/themes";
import AllRoutes from "./Router/AllRoutes";
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";
import { Provider } from "react-redux";
import store from "./Store/Store";
function App() {
  return (
    <div>
      <NextUIProvider>
        <Provider store={store}>
          <AllRoutes />
          <div>
            <Toaster />
          </div>
        </Provider>
      </NextUIProvider>
    </div>
  );
}

export default App;
