import { DM_Sans, DM_Serif_Display } from "next/font/google";

const titleFont = DM_Serif_Display({weight: "400", subsets: ["latin"]});
const articleFont = DM_Sans({weight: "400", subsets: ["latin"]});

export default function Article() {
    return (
        <div>
          <h2 className={titleFont.className + " mt-5 mb-2 text-2xl"}>DM Serif Display & DM Sans</h2>
          <div className={articleFont.className + " mb-9"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>
        </div>
      );
}