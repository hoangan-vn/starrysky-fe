import { Suspense } from 'react';
import Loading from './Loading';

type DataListenerProps = {
  children: React.ReactNode;
};

export default function DataListener({ children }: DataListenerProps) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
