import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

interface ChequeData {
    nom: string;
    mont_en_lettre: string;
    montant_en_chiffre: string;
    date: string;
    numero_de_cheque: string;
}

const OCRComponent: React.FC = () => {
    const [imageUrl, setImageUrl] = useState('');
    const [chequeData, setChequeData] = useState<ChequeData | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setImageUrl(file ? URL.createObjectURL(file) : '');
    };

    const handleOCR = () => {
        if (!imageUrl) {
            return;
        }

        Tesseract.recognize(
            imageUrl,
            'eng',
            { logger: m => console.log(m) }
        ).then(({ data: { text } }) => {
            const lines = text.split('\n');
            const chequeData: ChequeData = {
                nom: lines[2], // Assuming the name is on the first line
                mont_en_lettre: lines[0], // Assuming the amount in words is on the second line
                montant_en_chiffre: lines[1], // Assuming the amount in numbers is on the third line
                date: lines[3], // Assuming the date is on the fourth line
                numero_de_cheque: lines[4], // Assuming the cheque number is on the fifth line
            };
            setChequeData(chequeData);
        });
    };

    return (
        <div>
            <input type="file" onChange={handleImageUpload} />
            <button onClick={handleOCR}>Extract Text</button>
            {chequeData && <pre>{JSON.stringify(chequeData, null, 2)}</pre>}
        </div>
    );
};

export default OCRComponent;