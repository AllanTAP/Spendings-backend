import { setUserCurrency } from '../../../domain/Currency.js'
import { deleteEntry, setEntry } from '../../../domain/Entries.js'
import { setSpendType } from '../../../domain/SpendTypes.js'

export default {
  setEntry: setEntry,
  deleteEntry: deleteEntry,
  setSpendType,
  setUserCurrency,
}
