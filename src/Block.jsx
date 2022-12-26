import React from 'react';

const Block = ({ value, currency, onChangeValue, onChangeCurrency }) => {

    const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

    return (
        <div className="block">
            <ul className="currencies">
                {defaultCurrencies.map((cur) => (
                    <li
                        onClick={() => onChangeCurrency(cur)}
                        className={currency === cur ? 'active' : ''}
                        key={cur}
                    >
                        {cur}
                    </li>
                ))}
            </ul>

            <input
                onChange={(e) => onChangeValue(e.target.value>=0 ? e.target.value : 0)}
                value={value ? value : 0}
                type="number"
                placeholder={'0'}
            />
        </div>
    );
};

export default Block;

