import { PrimeReactProvider } from "primereact/api";

import "../styles/globals.css";
import "primereact/resources/themes/lara-light-blue/theme.css";

export default function App({
  Component,
  pageProps,
}: {
  Component: React.ElementType;
  pageProps: any;
}) {
  return (
    <PrimeReactProvider>
      <Component {...pageProps} />
    </PrimeReactProvider>
  );
}
