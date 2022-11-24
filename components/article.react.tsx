import styled from 'styled-components';
import {Post} from '../lib/mdx';
import * as React from 'react';
import {getMDXComponent} from 'mdx-bundler/client';

const ArticleTitle = styled.h2`
    font-weight: 500;
    font-size: 28px;
    line-height: 28px;
    letter-spacing: normal;
    font-family: 'DM Serif Display';
    text-size-adjust: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    color: rgb(39,39,39);
`;

const ArticleContent = styled.div`
    font-family: "DM Sans";
    font-size: 18px;
    line-height: 21.6px;
    text-align: left;
    text-size-adjust: 100%;
    color: rgba(0,0,0,0.6);
    margin-bottom: 60px;
`;

interface Props {
  post: Post
}

export default function Article(props: Props) {
  const {post} = props;
  const {code} = post;

  const Component = React.useMemo(() => getMDXComponent(code), [code]);

  return (
    <div>
      <ArticleTitle>{post.frontmatter.title}</ArticleTitle>
      <ArticleContent>
        <Component />
      </ArticleContent>
    </div>
  );
}
