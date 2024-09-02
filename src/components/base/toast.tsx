
type ToastMessage = string;
interface ToastConfig {
    message: string,
    type?: string,
    duration?: number,
    top?: string,
}
export const toast = (info: ToastConfig | ToastMessage, type?: string) => {
    const id = Date.now().toString(32);
    const box = document.createElement(`div`);
    let msg = '';
    let duration = 2500;
    if (!info) {
        return;
    }
    if (typeof info === "string") {
       msg = info;
    } else {
        msg = info?.message || '';
        if (info?.duration) duration = info?.duration;
    }
    const text = document.createTextNode(msg);
    const tps = type || (typeof info === 'object' && info.type);
    const top = typeof info === 'object' && info.type || 'top-[230px]';
    if (tps) {
        box.className = `vs-toast fixed left-1/2 z-50 rounded-lg max-w-[320px] text-sm ${top} mo:text-xs -translate-x-1/2 pt-2 pb-2 pl-4 pr-4 bg-white animate-vsToast flex items-center`;
        if (tps === 'success') {
            const icon = document.createElement('i');
            icon.className = 'iconfont vc-suc mr-2 text-lg text-green-600';
            box.appendChild(icon);
        }
        if (tps === 'error') {
            const icon = document.createElement('i');
            icon.className = 'iconfont vc-warning mr-2 text-lg text-red-600';
            box.appendChild(icon);
        }
    } else {
        box.className = `vs-toast fixed ${top} left-1/2 z-50 text-white rounded-full max-w-[320px] text-sm mo:text-xs -translate-x-1/2 pt-2 pb-2 pl-4 pr-4 bg-black/50 animate-vsToast`;
    }
    box.appendChild(text);
    box.id = id;
    document.body.appendChild(box);
    setTimeout(() => {
        const child = document.getElementById(id);
        if (child) {
            document.body.removeChild(child);
        }
    }, duration);
}