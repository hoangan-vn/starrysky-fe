import React from 'react';

type RenderIfProps = {
  condition: boolean;
  children: React.ReactNode;
};

export default function RenderIf({ condition, children }: RenderIfProps) {
  return condition ? <>{children}</> : null;
}
