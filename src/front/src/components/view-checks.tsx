import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Cheque {
    id: number;
    montantChiffre: number;
    nomPrenom: string;
    numeroCompteRecepteur: string;
    codeBanque: string;
}

const switchVue = (): void => {
    
  };

const ChequeCard: React.FC<{ cheque: Cheque }> = ({ cheque }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Chèque #{cheque.id}</h2>
            <p className="text-gray-600">Montant: {cheque.montantChiffre}€</p>
            <p className="text-gray-600">Bénéficiaire: {cheque.nomPrenom}</p>
            <p className="text-gray-600">Compte créditeur: {cheque.numeroCompteRecepteur}</p>
            <p className="text-gray-600">Code banque: {cheque.codeBanque}</p>
        </div>
    );
};

const ChequeList: React.FC = () => {
    const [cheques, setCheques] = useState<Cheque[]>([]); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Cheque[]>("http://localhost:3000/cheques");
                console.log('Réponse de l\'API :', response.data);
                setCheques(response.data); 
            } catch (error) {
                console.error('Erreur lors de la requête :', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col space-y-4">
            {cheques.map((cheque) => (
                <ChequeCard key={cheque.id} cheque={cheque} />
            ))}
        </div>
    );
};

const View: React.FC = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Vue des chèques bancaires</h1>
            <ChequeList />
        </div>
    );
};

export default View;
