import React, { PropsWithChildren } from 'react';
import { useLinkToRoute } from 'mobx-router6';
import { routes } from './routes';

interface Props {
  to: typeof routes[number]['name'];
  params: typeof routes[number]['params'];
}

export function Link({ to, params, children }: PropsWithChildren<Props>) {
  const props = useLinkToRoute({ name: to, params });
  if (!to) {
    console.error('link name is not specified');
    return null;
  }

  return <a {...props}>{children}</a>;
}
