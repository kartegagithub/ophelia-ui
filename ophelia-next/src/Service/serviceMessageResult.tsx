import Alert from "../Components/Alert";
import { ServiceMessage } from "ophelia-core";

const ServiceMessageResult = (props: ServiceMessage) => {
  return (
    <Alert type="error">
      {props.code} - {props.description}
    </Alert>
  );
};

export default ServiceMessageResult;
