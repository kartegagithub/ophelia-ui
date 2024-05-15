import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";
import Modal from "../Modal";
import RawHTML from "../RawHTML";

export default class AgreementCheckboxInput<P> extends React.Component<P & Omit<InputHTMLAttributes<HTMLInputElement>, "checked"> & {
  agreementText: string,
  modalClassName?: string,
  modalTitle?: string,
  agreeButtonText?: string,
  agreeButtonClassName?: string
  rejectButtonText?: string,
  rejectButtonClassName?: string
  waitForBottomScroll?: boolean
}, {showModal: boolean, checked: boolean, viewedAgreement: boolean}>{
  constructor(props: any){
    super(props)
    this.state = {showModal: false, checked: false, viewedAgreement: false}
  }

  cbRef = React.createRef<HTMLInputElement>()

  cbClick(e: React.MouseEvent<HTMLInputElement>){
    //console.log("cbClick", this.state.checked)
    if(this.state.checked){
      this.setState({showModal: false, checked: false})
    }
    else if(this.cbRef.current){
      this.setState({showModal: true, checked: false})
    }
  }
  onButtonClick(e: any, item: any){
    if(item.text == this.props.agreeButtonText){
      this.setState({showModal: false, checked: true})
    }
    else
    this.setState({showModal: false, checked: false})
  }
  render(): React.ReactNode {
    var buttons = [
      {text: this.props.agreeButtonText, className: this.props.agreeButtonClassName, closeModalOnClick: true, onClick: (e: any, item: any) => this.onButtonClick(e, item), disabled: !this.state.viewedAgreement},
      {text: this.props.rejectButtonText, className: this.props.rejectButtonClassName, closeModalOnClick: true, onClick: (e: any, item: any) => this.onButtonClick(e, item)}
    ];
    return (
      <>
        {this.state.showModal && <Modal onBottomScroll={() => this.setState({ viewedAgreement: true})} buttons={buttons} title={this.props.modalTitle} className={this.props.modalClassName} dismissOnBackdropClick={false} defaultOpen={true}>
          <RawHTML html={this.props.agreementText} />
        </Modal>}
        <input
          type="checkbox"
          ref={this.cbRef}
          onClick={(e) => this.cbClick(e)}
          name={this.props.name}
          id={this.props.id}
          checked={this.state.checked}
          className={this.props.className ?? getAppTheme().Inputs?.checkbox}
        />
      </>
    );
  }
}