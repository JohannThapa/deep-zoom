import React from "react";
import PropTypes from "prop-types";
import { saveAs } from 'file-saver'

function Downloader({ linkUrl = "", name = "" }) {

    console.log(name)
    const [fetching, setFetching] = React.useState(false);
    const [error, setError] = React.useState(false);
    async function downloader(url) {
        const a = document.createElement("a");
        a.href = await toDataURL(url);
        a.download = name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    function toDataURL(url) {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            });
    }
    const download = (url, name) => {

        navigator.clipboard.writeText(name)
        if (!url) {
            throw new Error("Resource URL not provided! You need to provide one");
        }
        setFetching(true);
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                setFetching(false);
                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = blobURL;
                a.style = "display: none";

                if (name && name.length) a.download = name;
                document.body.appendChild(a);
                a.click();
            })
            .catch(() => setError(true));
    };
    const downloadPhoto = () => {
        saveAs(linkUrl, name);
    }
    function clip(x) {
        navigator.clipboard.writeText(x)
    }
    function onClick() {
        downloader(linkUrl);
    }
    return (
        <div className="d-f-center">
            <a className="button-download" href={linkUrl} target="_blank" download disabled={fetching}
                onClick={clip(name)}
                >
                Download
            </a>
            <a className="button-download" 
                onClick={downloadPhoto}
                >
                Download name
            </a>
        </div>
    );
}
Downloader.propTypes = {
    linkUrl: PropTypes.string,
    name: PropTypes.string,
};

export default Downloader;
