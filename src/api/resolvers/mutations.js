import { setUserCurrency } from '../../../domain/Currency.js'
import {
  deletePaymentEntry,
  setPaymentEntry,
  setPaymentType,
} from '../../../domain/Payment.js'
import { deleteSpendEntry, setSpendEntry, setSpendType } from '../../../domain/Spend.js'

export default {
  setUserCurrency,
  setSpendType,
  setSpendEntry,
  deleteSpendEntry,
  setPaymentType,
  setPaymentEntry,
  deletePaymentEntry,
}
