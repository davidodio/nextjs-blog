import Head from 'next/head';

import {Responsive} from '../../layouts';
import { DateDisplay } from '../../components';
import { getAllPostIds, getPostData } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css'

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  }
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title}</title>
      </Head>    
      <Responsive>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <DateDisplay dateString={postData.date} />
        </div>        
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </Responsive>
    </>
  );
}