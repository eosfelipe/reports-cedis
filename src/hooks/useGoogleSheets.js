import { GoogleSpreadsheet } from 'google-spreadsheet'
const useGoogleSheets = () => {
  const SPREADSHEET_ID = process.env.REACT_APP_SPREADSHEET_ID
  const SHEET_ID = process.env.REACT_APP_SHEET_ID
  const CLIENT_EMAIL = process.env.REACT_APP_GOOGLE_CLIENT_EMAIL
  const PRIVATE_KEY = process.env.REACT_APP_GOOGLE_SERVICE_PRIVATE_KEY
  const doc = new GoogleSpreadsheet(SPREADSHEET_ID)
  const appendRow = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY
      })
      await doc.loadInfo()
      const sheet = doc.sheetsById[SHEET_ID]
      const rows = await sheet.getRows()

      console.log(rows)
    } catch (error) {
      console.log(error)
    }
  }

  return { appendRow }
}

export default useGoogleSheets
