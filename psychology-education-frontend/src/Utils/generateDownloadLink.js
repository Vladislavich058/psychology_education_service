import {getBlobType} from "./getBlobType";

export const generateDownloadLink = (reportName, format, data) => {
    let _type = getBlobType(format);
    const url = window.URL.createObjectURL(
        new Blob([data], {type: _type})
    );
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${reportName}.${format}`);
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
}