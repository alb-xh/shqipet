import React from 'react';

import { GeneralPage } from './general.page';

export const ErrorPage =() => (
  <GeneralPage
    title="404"
    description="The page you’re looking for doesn’t exist."
    color="red"
  />
);