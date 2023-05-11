import { Exo_2 } from "next/font/google";

const exo_2 = Exo_2({ weight: "500", subsets: ["latin"], style: "italic" });

export default function Navbar() {
  const liClass = "transition group duration-300 whitespace-nowrap";
  const underlineClass = "block group-hover:max-w-[70%] ml-2 transition-all duration-500 h-0.5"
  const underline = (
    <span className={underlineClass + " max-w-0 bg-orange-400"} />
  );
  const selected = (
    <span className={underlineClass + " max-w-[70%] bg-orange-500"}  />
  )

  return (
    <ul
      className={["flex flex-wrap justify-center space-x-2 text-gray-400 italic pt-3 max-w-full", exo_2.className].join(
        " "
      )}
    >
      <li className={liClass}>
        <a href="#">Writings/Projects</a>
        {selected}
      </li>
      <li className={liClass}>About{underline}</li>
      <li className={liClass}>Bucket List{underline}</li>
      <li className={liClass}>Cooking{underline}</li>
      <li className={liClass}>Flying{underline}</li>
    </ul>
  );
}