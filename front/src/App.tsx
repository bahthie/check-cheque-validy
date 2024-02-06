import { useState } from 'react'
import './index.css'
import CheckImageReader from './components/image-reader'
import OCRComponent from './components/ocr'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)

  const sendDataPost = (): void => {

    const checkNumberElement = document.getElementById("checkNumber") as HTMLInputElement | null;
    const nameElement = document.getElementById("name") as HTMLInputElement | null;
    const amount = document.getElementById("amountNumber") as HTMLInputElement | null;
    const amountLetter = document.getElementById("amountWords") as HTMLInputElement | null;
    const bankCode = document.getElementById("bankCode") as HTMLInputElement | null;
    const receptorAccount = document.getElementById("accountNumber") as HTMLInputElement | null;

    if (checkNumberElement && nameElement && amount && amountLetter && bankCode && receptorAccount) {
      const checkNumberValue = checkNumberElement.value;
      const nameElementValue = nameElement.value;
      const amountValue = amount.value;
      const amountLetterValue = amountLetter.value;
      const bankCodeValue = bankCode.value;
      const receptorAccountValue = receptorAccount.value;

      // Utilisez checkNumberValue en toute sécurité
      // Les données à envoyer
      const data = {
        numeroCheque: checkNumberValue,
        nomPrenom: nameElementValue,
        montantChiffre: amountValue,
        montantLettres: amountLetterValue,
        codeBanque: bankCodeValue,
        numeroCompteRecepteur: receptorAccountValue
      };

      // Effectuer la requête POST
      axios.post('http://localhost:3000/cheques', data)
        .then(response => {
          console.log('Réponse de la requête POST :', response.data);
          checkNumberElement.value = "";
          nameElement.value = "";
          amount.value = "";
          amountLetter.value = "";
          bankCode.value = "";
          receptorAccount.value = "";
          alert("Enregistré !")
          // Traitez la réponse ici si nécessaire
        })
        .catch(error => {
          console.error('Erreur lors de la requête POST :', error);
          alert('Erreur lors de la requête POST :' + error)
        });
    } else {
      alert('Il reste des champs vides !')
    }

  };

  return (
    <>
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
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Entrez le nom et prénom"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amountNumber"
                type="text"
                placeholder="Entrez le montant en chiffres"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="amountWords"
                type="text"
                placeholder="Entrez le montant en lettres"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="bankCode"
                type="text"
                placeholder="Entrez le code de la banque"
              />
            </div>
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="accountNumber"
                type="text"
                placeholder="Entrez le numéro de compte qui reçoit"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              id="submitButton"
              onClick={sendDataPost}
            >
              Soumettre
            </button>
          </form>
        </div>
        <div className="container mx-auto p-4">
          {/* <CheckImageReader/>     */}
          <OCRComponent />
        </div>
      </div>
    </>
  )
}
export default App
