import { typeCheck } from "ophelia-core";
import { Children } from "react";

export const deepMap = (children: any, types: string[]): Array<any> => {
  var result: Array<any> = []
  if(!children)
    return result;

  Children.forEach(children, (child) => {
    if (child === null) return null;

    if (typeCheck(child, types)) {
      result.push(child);
    }

    if (
      child.props &&
      child.props.children &&
      typeof child.props.children === 'object'
    ) {
      result = result.concat(deepMap(child.props.children, types))
    }
    return undefined
  });
  return result;
}
