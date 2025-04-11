// import DOMPurify from 'dompurify';

type HTMLStringType = {
  strTag: string;
};

export default function HTMLString({ strTag }: HTMLStringType) {
  // const sanitizedHtml = DOMPurify.sanitize(strTag);
  return <div dangerouslySetInnerHTML={{ __html: strTag }} />;
}
