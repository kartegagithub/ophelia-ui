var inputsTheme: {
  text?: string,
  textarea?: string,
  selectbox?: string,
  selectboxClass?: string,
  selectboxWithSwitch?: {
    Class?: string,
    ItemClass?: string,
    SelectedItemClass?: string
  },
  filterbox?: {
    className?: string,
    selectedItemContainerClass?: string,
    placeholderContainerClass?: string
  },
  checkbox?: string,
  radio?: {
    square: string,
    circle: string,
  }
  boolean?: string,
  enum?: string,
  password?: string,
  richtext?: string,
  date?: string,
  datetime?: string,
  numeric?: string,
  withCode?: string,
  label?: string,
  file?: string,
  inputLabel?: string,
  floatingFixedLabel?: string, 
  seperatedLabel?: string,
  month?: string,
  email?: string,
  phone?: string,
  url?: string,
  range?: string,
  time?: string,
  week?: string
}
export type InputsTheme = typeof inputsTheme