import { AppRoutes } from "./routes";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./stores/redux";
import { NotificationProvider } from "./providers/NotificationProvider";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={5}>
        <NotificationProvider>
          <BrowserRouter>
            <AppRoutes/>
          </BrowserRouter>
        </NotificationProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
