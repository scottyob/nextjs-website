import { AiOutlineGithub, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineTwitter } from "react-icons/ai";
import { FaGoodreads } from "react-icons/fa";

export default function About() {

  return <div className="pt-20 flex justify-center gap-2 text-orange-400">
    <a className="transition hover:scale-150" target="_blank" href="https://www.instagram.com/scottyob/"><AiOutlineInstagram size={42} /></a>
    <a className="transition hover:scale-150" target="_blank" href="https://www.github.com/scottyob"><AiOutlineGithub size={42} /></a>
    <a className="transition hover:scale-150" target="_blank" href="https://www.linkedin.com/in/scott-o-brien-087304a1/"><AiOutlineLinkedin size={42} /></a>
    <a className="transition hover:scale-150" target="_blank" href="https://www.goodreads.com/user/show/71179681-scott-o-brien"><FaGoodreads size={42} /></a>
    <a className="transition hover:scale-150" target="_blank" href="https://twitter.com/scottyob"><AiOutlineTwitter size={42} /></a>
  </div>
}
