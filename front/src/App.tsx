import { useState } from 'react'
import './index.css'
import OCRComponent from './components/ocr'
import axios from 'axios'
import View from './components/view-checks';


function App() {
  const [checkNumber, setCheckNumber] = useState("");
  const [handleChequeView, setHandleChequeView] = useState(true);
  const [name, setName] = useState("");
  const [amountNumber, setAmountNumber] = useState("");
  const [amountWords, setAmountWords] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const sendDataPost = (): void => {
    // Les données à envoyer
    const data = {
      numeroCheque: checkNumber,
      nomPrenom: name,
      montantChiffre: amountNumber,
      montantLettres: amountWords,
      codeBanque: bankCode,
      numeroCompteRecepteur: accountNumber
    };

    

    // Effectuer la requête POST
    axios.post('http://localhost:3000/cheques', data)
      .then(response => {
        console.log('Réponse de la requête POST :', response.data);
        setCheckNumber("");
        setName("");
        setAmountNumber("");
        setAmountWords("");
        setBankCode("");
        setAccountNumber("");
        alert("Enregistré !")

        setHandleChequeView(true);
        // Traitez la réponse ici si nécessaire
      })
      .catch(error => {
        setHandleChequeView(true);
        console.error('Erreur lors de la requête POST :', error);
        alert('Erreur lors de la requête POST :' + error)
      });
  };

  const isFormValid = checkNumber && name && amountNumber && amountWords && bankCode && accountNumber;

  return (
    handleChequeView ? <View/> : <>
      <div className="bg-blue-500 p-4 text-center">
        <h1 className="text-white text-2xl font-bold">Dépôt de chèque</h1>
      </div>
      <div className='flex-col m-auto w-11/12'>
        <div className="container mx-auto p-4 w-1/2">
          <h1 className="text-2xl font-bold mb-4">Informations sur le chèque</h1>
          <form className="mb-4">
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="checkNumber"
                type="text"
                placeholder="Entrez le numéro de chèque"
                onChange={e => setCheckNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Entrez le nom et prénom"
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amountNumber"
                type="text"
                placeholder="Entrez le montant en chiffres"
                onChange={e => setAmountNumber(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amountWords"
                type="text"
                placeholder="Entrez le montant en lettres"
                onChange={e => setAmountWords(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bankCode"
                type="text"
                placeholder="Entrez le code de la banque"
                onChange={e => setBankCode(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="accountNumber"
                type="text"
                placeholder="Entrez le numéro de compte qui reçoit"
                onChange={e => setAccountNumber(e.target.value)}
              />
            </div>
            <button
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isFormValid ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-500 text-gray-200 cursor-not-allowed'}`}
              type="submit"
              id="submitButton"
              onClick={sendDataPost}
              disabled={!isFormValid}
            >
              Soumettre
            </button>
          </form>
        </div>
        <div className="container mx-auto p-4">
          <OCRComponent />
        </div>
      </div>
    </>
  )
}
export default App;