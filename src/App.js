import React, {useEffect, useRef, useState} from 'react';
import Block from "./Block";

const App = () => {
    const [fromCur, setFromCur] = useState('RUB');
    const [toCur, setToCur] = useState('USD');
    const [fromPrice, setFromPrice] = useState(0);
    const [toPrice, setToPrice] = useState(1);

    const ratesRef = useRef({})

    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then(res => res.json())
            .then(json =>  {
                ratesRef.current = json.rates;
                onChangeToPrice(1);
            })
            .catch(e =>  console.log('Error: '+ e))
    }, [])

    const onChangeFromPrice = (value) => {
        let price

        if(fromCur==='RUB'){
            price = value*ratesRef.current[toCur];
        } else if (toCur==='RUB'){
            price = value/ratesRef.current[fromCur]
        } else {
            price = value*ratesRef.current[toCur]/ratesRef.current[fromCur]
        }

        setFromPrice(value);
        setToPrice(price);
    }

    const onChangeToPrice = (value) => {
        let price

        if(toCur==='RUB'){
            price = value*ratesRef.current[fromCur];
        } else if (fromCur==='RUB'){
            price = value/ratesRef.current[toCur]
        } else {
            price = value*ratesRef.current[fromCur]/ratesRef.current[toCur]
        }
        setFromPrice(price);
        setToPrice(value);
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice)
        onChangeToPrice(toPrice)
    }, [fromCur, toCur])


    return (
        <div className="App">
            <Block
                value={fromPrice}
                currency={fromCur}
                onChangeCurrency={setFromCur}
                onChangeValue={onChangeFromPrice}
            />
            <Block
                value={toPrice}
                currency={toCur}
                onChangeCurrency={setToCur}
                onChangeValue={onChangeToPrice}
            />
        </div>
    );
};

export default App;
