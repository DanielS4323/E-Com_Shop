import React from 'react';

function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() =>
      factory().then((module) => ({ default: module[name] })),
    ),
  });
}

export default lazyImport;
