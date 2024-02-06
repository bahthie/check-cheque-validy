import React from 'react';

interface Cheque {
    id: number;
    montant: number;
    beneficiaire: string;
    date: string;
}

const cheques: Cheque[] = [
    { id: 1, montant: 100, beneficiaire: 'John Doe', date: '2022-01-01' },
    { id: 2, montant: 200, beneficiaire: 'Jane Smith', date: '2022-01-02' },
    { id: 3, montant: 300, beneficiaire: 'Alice Johnson', date: '2022-01-03' },
];

const ChequeCard: React.FC<{ cheque: Cheque }> = ({ cheque }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">Chèque #{cheque.id}</h2>
            <p className="text-gray-600">Montant: {cheque.montant}€</p>
            <p className="text-gray-600">Bénéficiaire: {cheque.beneficiaire}</p>
            <p className="text-gray-600">Date: {cheque.date}</p>
        </div>
    );
};

const ChequeList: React.FC = () => {
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