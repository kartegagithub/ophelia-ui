import { getAppTheme } from "../../AppTheme";
import React, { InputHTMLAttributes } from "react";
import Modal from "../Modal";
import RawHTML from "../RawHTML";

export default class AgreementCheckboxInput<P> extends React.Component<
  P &
    Omit<InputHTMLAttributes<HTMLInputElement>, "checked"> & {
      agreementText: string;
      modalClassName?: string;
      modalTitle?: string;
      agreeButtonText?: string;
      agreeButtonClassName?: string;
      rejectButtonText?: string;
      rejectButtonClassName?: string;
      waitForBottomScroll?: boolean;
      onCheckChange?: (
        checked: boolean,
        ref: HTMLInputElement | undefined | null
      ) => void;
      label?: React.ReactNode;
      id?: string;
    },
  { showModal: boolean; checked: boolean; viewedAgreement: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { showModal: false, checked: false, viewedAgreement: false };
  }

  cbRef = React.createRef<HTMLInputElement>();

  cbClick(e: React.MouseEvent<HTMLInputElement>) {
    e.preventDefault();
    if (this.state.checked) {
      // Eğer checkbox işaretliyse, işaretini kaldırmak yerine modalı tekrar aç
      this.setState({ showModal: true });
    } else if (this.cbRef.current) {
      this.setState({ showModal: true, checked: false });
    }
  }

  onButtonClick(e: any, item: any) {
    var checked = item.text === this.props.agreeButtonText;
    this.setState({ showModal: false, checked: checked });

    if (this.cbRef.current) this.cbRef.current.checked = checked;
    this.props.onCheckChange &&
      this.props.onCheckChange(this.state.checked, this.cbRef.current);

    var event: any = {
      currentTarget: this.cbRef.current,
      target: this.cbRef.current,
      bubbles: true,
    };
    if (this.props.onChange) this.props.onChange(event);
  }

  handleLabelClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    this.setState({ showModal: true });
  };

  render(): React.ReactNode {
    var buttons = [
      {
        text: this.props.agreeButtonText,
        className: this.props.agreeButtonClassName,
        closeModalOnClick: true,
        onClick: (e: any, item: any) => this.onButtonClick(e, item),
        disabled: this.props.waitForBottomScroll && !this.state.viewedAgreement,
      },
      {
        text: this.props.rejectButtonText,
        className: this.props.rejectButtonClassName,
        closeModalOnClick: true,
        onClick: (e: any, item: any) => this.onButtonClick(e, item),
      },
    ];
    return (
      <>
        {this.state.showModal && (
          <Modal
            onBottomScroll={() => this.setState({ viewedAgreement: true })}
            buttons={buttons}
            title={this.props.modalTitle}
            dismissOnBackdropClick={false}
            defaultOpen={true}
            onCurrentValue={() => {}}
          >
            <RawHTML html={this.props.agreementText} />
          </Modal>
        )}
        <div id={this.props.id} className="oph-agreementCheckbox">
          <input
            type="checkbox"
            ref={this.cbRef}
            onClick={(e) => this.cbClick(e)}
            name={this.props.name}
            id={this.props.id}
            checked={this.state.checked}
            className={`${this.props.className} oph-agreementCheckbox-input`}
            style={this.props.style}
          />
          {this.props.label && (
            <label htmlFor={this.props.id}>
              {/* label içindeki link tıklamalarını handleLabelClick'e yönlendirdim */}
              {React.cloneElement(this.props.label as React.ReactElement<any>, {
                onClick: this.handleLabelClick,
              })}
            </label>
          )}
        </div>
      </>
    );
  }
}
