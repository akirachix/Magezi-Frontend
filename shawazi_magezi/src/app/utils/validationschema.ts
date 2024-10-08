import * as yup from 'yup';

export const agreementSchema = yup.object().shape({
  parcel_number: yup.number().required('Parcel number is required').positive(),
  seller: yup.string().required('Seller is required'),
  buyer: yup.string().required('Buyer is required'),
  lawyer: yup.string().required('Lawyer is required'),
  date_created: yup.date().required('Date created is required'),
  contract_duration: yup.number().required('Contract duration is required').positive(),
  agreed_amount: yup.number().required('Agreed amount is required').positive(),
  installment_schedule: yup.number().required('Installment schedule is required').positive(),
  penalties_interest_rate: yup.number().required('Penalties interest rate is required').positive(),
  down_payment: yup.number().required('Down payment is required').positive(),
  buyer_agreed: yup.string().required('Buyer agreement status is required'),
  seller_agreed: yup.string().required('Seller agreement status is required'),
  terms_and_conditions: yup.string().required('Terms and conditions are required'),
  transaction_count: yup.number().required('Transaction count is required').positive(),
  remaining_amount: yup.number().required('Remaining amount is required').positive(),
  total_amount_made: yup.number().required('Total amount made is required').positive(),
  agreement_hash: yup.string().required('Agreement hash is required'),
  previous_hash: yup.string().required('Previous hash is required'),
  transactions_history: yup.string().required('Transactions history is required')
});