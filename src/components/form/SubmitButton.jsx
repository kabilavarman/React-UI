import React from "react";
import { Button } from "semantic-ui-react";

/*
 * State allows React components to change their output over time in response to user actions,
 *network responses, and anything else, without violating this rule
 * React elements are plain objects
 * React DOM compares the element and its children to the previous one,
 * and only applies the DOM updates necessary to bring the DOM to the desired state
 * To render a React element into a root DOM node
 * node whose contents has changed gets updated by React DOM
 */
export const SubmitButton = ({ className, text, response }) => {
  return (
    <React.Fragment>
      {response && !response.isFetching && (
        <button type="submit" className={className}>
          {text}
        </button>
      )}
      {response && response.isFetching && (
        <Button loading type="button" className={className} role="button" />
      )}
    </React.Fragment>
  );
};
