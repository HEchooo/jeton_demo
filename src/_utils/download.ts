import Cookies from "js-cookie";

const downloadType = {
    'text': 'text/plain',
    'pdf': 'application/pdf',
    'zip': 'application/zip',
    'csv': 'text/csv',
    'rar': 'application/rar',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'png': 'image/png',
    'gif':'image/gif',
    'jpeg':'image/jpeg',
    'jpg': 'image/jpeg',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
}

export const downFiles = (url: string, name: string) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    const token = Cookies.get('pay_token') || sessionStorage.getItem('pay_token');
    xhr.setRequestHeader("Authorization", token || '');
    xhr.send();
    xhr.responseType = "blob";
    xhr.onload = function() {
        const blob = this.response;
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = function (e) {
            const a = document.createElement('a');
            a.download= name;
            //@ts-ignore
            a.href = e.target?.result;
            document.body.appendChild(a)
            a.click();
        }
    }
}