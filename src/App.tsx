import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import GasPrices from "./components/GasPrice";

function App() {
  return (
    <Theme hasBackground={false}>
      <GasPrices />
    </Theme>
  );
}

export default App;
