import { useState, useEffect } from "react";



export default function PDFViewer({ fileLink, visible, onHide }) {
    const [visibility, setvisibility] = useState(visible);

    useEffect(() => {
        setvisibility(visible);
    }, [visible]);

    const styles = {
        pdfContainer: {
            display: visibility ? 'block' : 'none',
            backgroundColor: 'rgba(92, 92, 92, 0.863)',
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            zIndex: 200000,
            textAlign: 'center',
            paddingTop: '10vh',
        },
        pdfFile: {
            width: '90vw',
            height: '80vh'
        },
        CloseButton: {
            marginTop: '10px',
            textDecoration: 'none',
            backgroundColor: 'maroon',
            color: 'white',
            padding: '5px 10px',
            fontSize: '1.5em',
            outline: 'none',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
        }
    }

    const Close = () => {
        setvisibility(false);
        onHide();
    }

    return (
        <div className="pdfContainer" style={styles.pdfContainer} onClick={e => Close()}>
            <iframe title="Brochure" src={fileLink} style={styles.pdfFile} frameBorder="0"></iframe>
            <div><input type="button" value="Close" onClick={e => Close()} style={styles.CloseButton} /></div>
        </div>
    );
}