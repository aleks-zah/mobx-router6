import React, { PropsWithChildren } from 'react';
import { useLink } from './useLinkTo';

type Props<RouteNames extends string> = PropsWithChildren<{
  to: RouteNames;
  params?: object;
  onClick?: (e?: React.MouseEvent<{}>) => void;
}>;

export const Link = <RouteNames extends string>({
  children,
  to,
  params,
  onClick,
  ...rest
}: Props<RouteNames>) => (
  <a {...rest} {...useLink(to, onClick)}>
    {children}
  </a>
);
