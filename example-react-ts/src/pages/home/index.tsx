import React from 'react';
import { Link } from '../../link';

export default () => (
  <div>
    homepage page
    <br />
    <Link to="products" params={{ id: 1 }}>
      go to product ID 1
    </Link>
  </div>
);
