"use client";

import { Modal } from 'pretty-modal'
import { useState } from 'react';

export type Props = {
  title: string;
  children?: string | JSX.Element | JSX.Element[];
}

export default function Item(props: Props) {
  const { title } = props;
  const [isOpen, setIsOpen] = useState(false);

  if (props.children === undefined) {
    return <li>{title}</li>
  }

  return <>
    <Modal open={isOpen} onClose={() => { setIsOpen(false) }}>
      <div className="flex justify-end">
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold px-1 mb-4 border border-gray-200 rounded shadow block "
          onClick={() => {
            setIsOpen(false)
          }}
        >
          X
        </button>
      </div>
      {props.children}
    </Modal>
    <a href="" onClick={(event) => { setIsOpen(true); event.preventDefault(); }}>
      <li>{title}</li>
    </a>

  </>

}
