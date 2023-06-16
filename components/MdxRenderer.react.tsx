"use client";

import React from 'react';
import { getMDXComponent } from 'mdx-bundler/client';

export type Props = {
  code: string;
}

/*
 * This is a Client react component responsible for rendering MDX content
*/

export default function ClientMdxRenderer(props: Props) {
  const code = props.code;
  const Component = React.useMemo(() => getMDXComponent(code), [code]);
  
  return <Component />


}
