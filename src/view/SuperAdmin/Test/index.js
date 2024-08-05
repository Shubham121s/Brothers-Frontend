import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const Header = () => {
    return (
        <div>
            <h1>Header</h1>
        </div>
    );
};

const Footer = () => {
    return (
        <div>
            <h2>Footer</h2>
        </div>
    );
};

const Row = ({ rowNumber }) => {
    return (
        <div>
            <p>Row {rowNumber}</p>
        </div>
    );
};

const Printable = () => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const renderRows = () => {
        const rows = [];
        for (let i = 1; i <= 10; i++) {
            rows.push(<Row key={i} rowNumber={i} />);
        }
        return rows;
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= 4; i++) {
            pages.push(
                <div key={i} style={{ height: '1100px', padding: '30px' }}>
                    <Header />
                    {renderRows()}
                    <Footer />
                </div>
            );
        }
        return pages;
    };

    return (
        <div>
            <button onClick={handlePrint}>Print</button>
            <div style={{ display: 'none' }}>
                <div ref={componentRef}>
                    {renderPages()}
                </div>
            </div>
        </div>
    );
};

export default Printable;
