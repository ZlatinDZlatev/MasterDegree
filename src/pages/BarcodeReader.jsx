import React, { useEffect, useRef, useState } from 'react';
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const BarcodeScanner = ({handleUpdate,stopStream, setStopStream}) => {

  const update = () =>{
    
  }

  return (
    <>
      <BarcodeScannerComponent
        stopStream={stopStream}
        onUpdate={ (err, result)=>{let result1 = handleUpdate(err, result);
          if(result1)
            setStopStream(true)} }
      />
      
    </>

  );
};

export default BarcodeScanner;
