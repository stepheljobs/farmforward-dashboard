import { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

interface BarcodeProps {
    value: string;
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    textMargin?: number;
    fontSize?: number;
    margin?: number;
    className?: string;
}

export function Barcode({
    value,
    format = 'code128',
    width = 2,
    height = 100,
    displayValue = true,
    textMargin = 0,
    fontSize = 20,
    margin = 10,
    className = '',
}: BarcodeProps) {
    const barcodeRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (barcodeRef.current) {
            try {
                JsBarcode(barcodeRef.current, value, {
                    format,
                    width,
                    height,
                    displayValue,
                    textMargin,
                    fontSize,
                    margin,
                });
            } catch (error) {
                console.error('Error generating barcode:', error);
            }
        }
    }, [value, format, width, height, displayValue, textMargin, fontSize, margin]);

    return <svg ref={barcodeRef} className={className} />;
} 