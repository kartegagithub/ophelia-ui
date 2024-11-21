import React from "react";
import { getImageComponent } from "../Image/Extensions";
import RawHTML from "../RawHTML";

const AccordionGroup: React.FC<{
  id?: string;
  title?: string;
  content?: string;
  count?: number;
}> = ({
  id,
  title = undefined,
  content = undefined,
  count = undefined,
}) => {
  return (
    <>
      <div id={id} className="oph-accordionGroup">
        {Array(count)
          .fill(0)
          .map((index) => (
            <details className="oph-accordionGroup-detail" key={index}>
              <summary className="oph-accordionGroup-summary">
                <p className="oph-accordionGroup-title">{title}</p>
                {getImageComponent({
                  name: "arrow-down",
                  color: "#5B6782",
                  size: 24,
                })}
              </summary>
              <p className="oph-accordionGroup-content">
                <RawHTML html={content} />
              </p>
            </details>
          ))}
      </div>
    </>
  );
};
export default AccordionGroup;
