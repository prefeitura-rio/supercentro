import React, { Suspense, lazy } from "react";
import { LoadingSuperCentro } from "./supercentro/loading";
import "./tailwind.css";

const SuperCentro = lazy(() => {
  return Promise.all([
    import("./supercentro/story"),
    new Promise((resolve) => setTimeout(resolve, 1)),
  ]).then(([moduleExports]) => moduleExports);
});

export default function App() {
  return (
    <div id={"main"}>
      <Suspense fallback={<LoadingSuperCentro />}>
        <>
          <SuperCentro />
        </>
      </Suspense>
    </div>
  );
}
