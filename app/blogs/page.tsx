import { BreadcrumbWithHistory } from '@/components/BreadcrumbHistory';
import { addBlogsJsonLd } from '@/lib/ld/blogs-json-ld';
import { routerName } from '@/lib/router/router';
import Head from 'next/head';

export default function page() {
  return (
    <>
      <Head>
        <title>My Blogs</title>
        <meta name='description' content='Super product with free shipping.' key='desc' />
        <script type='application/ld+json' dangerouslySetInnerHTML={addBlogsJsonLd()} key='blogs-jsonld' />
      </Head>
      <BreadcrumbWithHistory routesMap={routerName} maxVisibleItems={4} />
    </>
  );
}
