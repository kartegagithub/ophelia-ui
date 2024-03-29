import React from "react";
const Form: React.FC<{
    action?: string;
    method?: "get" | "post";
    className?: string;
    encType?: string;
    onSubmit?: Function;
    target?: string;
    preventSubmitEvent?: boolean
    children?: React.ReactNode;
  }> = ({ target, preventSubmitEvent = true, encType = "multipart/form-data", method = "post", action, onSubmit, className, children }) => {
    
    const onSubmitFn = (e: React.FormEvent) => {
        if(preventSubmitEvent === true)
            e.preventDefault();
        if(onSubmit){
            return onSubmit(e)
        }
        return false;
    }
    return (
      <form action={action} target={target} method={method} onSubmit={(e) => onSubmitFn(e)} className={className} encType={encType}>
        {children}
      </form>
    );
  };
  
  export default Form;
  