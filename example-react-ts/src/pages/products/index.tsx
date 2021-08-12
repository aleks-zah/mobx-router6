import * as React from 'react';
import { Link } from 'mobx-router6';

export default () => {
  return (
    <div>
      Products page
      <br />
      <Link to="index">go to homepage</Link>
    </div>
  );
};
