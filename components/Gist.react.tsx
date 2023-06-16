"use client";

import {useState, useEffect} from "react";

export default function Gist() {

  const [initialRenderComplete, setInitialRenderComplete] = useState(false);

  // This useEffect will only run once, during the first render
  useEffect(() => {
    // Updating a state causes a re-render
    setInitialRenderComplete(true);
  }, []);

  // initialRenderComplete will be false on the first render and true on all following renders
  if (!initialRenderComplete) {
    // Returning null will prevent the component from rendering, so the content will simply be missing from
    // the server HTML and also wont render during the first client-side render.
    return <div>Unrendered</div>;
  } else {
    return <div>
      <script src="https://gist.github.com/scottyob/896d7022b5ccc0ddc9567459731f9a16.js"></script>
    </div>;
  }
}
