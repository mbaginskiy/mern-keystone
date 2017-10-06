/*
Utility function to fetch required data for component to render in server side.
This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/blob/73e6e7d43ccd41e2eb557a70be79cebc494ee54b/src/common/api/fetchComponentDataBeforeRender.js
*/
import promiseSequence from './promiseSequence';

export default function fetchComponentData(store, components, params) {
  const needs = components.reduce((prev, current) => {
    const currentNeeds = current.need || [];
    if (current.WrappedComponent && (current.WrappedComponent.need !== currentNeeds)) {
      currentNeeds.concat(current.WrappedComponent.need);
    }
    return currentNeeds.concat(prev);
  }, []);

  return promiseSequence(needs, need => store.dispatch(need(params, store.getState())));
}
