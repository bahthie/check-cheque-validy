import React, { useState } from 'react';

function CheckImageReader() {
    const [imageData, setImageData] = useState('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                setImageData(dataUrl);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Télécharger l'image</h1>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
            />
            {imageData && (
                <div>
                    <h2>Image Preview:</h2>
                    <img src={imageData} alt="Check Image" />
                </div>
            )}
        </div>
    );
}

export default CheckImageReader;