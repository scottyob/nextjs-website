import styled from 'styled-components';

import Header from '../components/header.react';
import Article from '../components/article.react';
import {getPosts, Post} from '../lib/mdx';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Entries = styled.div`
  align-self: center;
  width: 80%;
  max-width: 650px;
`;

interface Props {
  posts: Array<Post>
}

export default function Home(props: Props) {
  const articles = props.posts.map((p, i) => <Article key={i} post={p} />);


  return (
    <Wrapper>
      <Header />
      <Entries>
        {articles}
      </Entries>
    </Wrapper>
  );
}

export async function getStaticProps() {
  // Load up the posts
  const posts = await getPosts();

  // TODO:  Sorting by date
  // TODO:  Pagination

  // Pass the loaded posts into Home component.  As some objects
  // are not JSON serializable and NextJS does not like that, do a hack
  // to stringify and parse them
  return {'props': {
    posts: posts.map((p) => JSON.parse(JSON.stringify(p))),
  }};
}
