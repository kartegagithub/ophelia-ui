import type { Meta, StoryObj } from '@storybook/react';
import AgreementCheckbox from '../../../Ophelia/Components//Inputs/AgreementCheckbox';

const meta = {
  title: 'Ophelia/Components/Inputs/AgreementCheckbox',
  component: AgreementCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AgreementCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: "cb-primary",
    name: "cb-primary",
    className: "",
    modalTitle: "Agreement",
    rejectButtonText: "Reject",
    agreeButtonText: "Agree",
    agreementText: `<h1>Your Contact Information</h1>
    Your User Agreement should include at least one way for users to get in contact with you. This clause can also include any steps users need to take to make requests concerning any personal information your business collects from them.
    
    DigitalPath is a wireless internet service provider that includes its contact info as well as how users can resolve complaints in the Redress Options section of its User Agreement:
    <h1>Device Licensing Requirements</h1>
    This part of your User Agreement describes what kind of devices are compatible with your website, software, or apps.

    Vagaro is a salon and spa booking platform that uses its User Agreement to inform users that its website can be accessed via mobile devices:
    <h1>Payments</h1>
    You should include a payment section in your User Agreement that outlines what payment methods you accept.

    The Payment Services, Purchases and Sale Transactions, and Credit Transactions section of Coinbase's User Agreement is extensive, and goes into detail about how users can load their wallets, how transactions work, what fees users can expect, and what happens when users choose recurring Digital Asset Transactions, along with other payment and transaction information:
    <h1>Your Contact Information</h1>
    Your User Agreement should include at least one way for users to get in contact with you. This clause can also include any steps users need to take to make requests concerning any personal information your business collects from them.
    
    DigitalPath is a wireless internet service provider that includes its contact info as well as how users can resolve complaints in the Redress Options section of its User Agreement:
    <h1>Device Licensing Requirements</h1>
    This part of your User Agreement describes what kind of devices are compatible with your website, software, or apps.

    Vagaro is a salon and spa booking platform that uses its User Agreement to inform users that its website can be accessed via mobile devices:
    <h1>Payments</h1>
    You should include a payment section in your User Agreement that outlines what payment methods you accept.

    The Payment Services, Purchases and Sale Transactions, and Credit Transactions section of Coinbase's User Agreement is extensive, and goes into detail about how users can load their wallets, how transactions work, what fees users can expect, and what happens when users choose recurring Digital Asset Transactions, along with other payment and transaction information:
    <h1>Your Contact Information</h1>
    Your User Agreement should include at least one way for users to get in contact with you. This clause can also include any steps users need to take to make requests concerning any personal information your business collects from them.
    
    DigitalPath is a wireless internet service provider that includes its contact info as well as how users can resolve complaints in the Redress Options section of its User Agreement:
    <h1>Device Licensing Requirements</h1>
    This part of your User Agreement describes what kind of devices are compatible with your website, software, or apps.

    Vagaro is a salon and spa booking platform that uses its User Agreement to inform users that its website can be accessed via mobile devices:
    <h1>Payments</h1>
    You should include a payment section in your User Agreement that outlines what payment methods you accept.

    The Payment Services, Purchases and Sale Transactions, and Credit Transactions section of Coinbase's User Agreement is extensive, and goes into detail about how users can load their wallets, how transactions work, what fees users can expect, and what happens when users choose recurring Digital Asset Transactions, along with other payment and transaction information:

    `
  },
};