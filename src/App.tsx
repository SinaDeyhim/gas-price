import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import GasPrices from "./components/GasPrice";

function App() {
  return (
    <Theme
      grayColor="gray"
      panelBackground="solid"
      scaling="100%"
      radius="full"
      hasBackground={false}
    >
      <GasPrices />
    </Theme>
  );
}

export default App;
