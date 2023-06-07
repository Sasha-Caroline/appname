import { TraceClassMethods } from 'src/app/core/log/decorator/trace-methods.decorator';

@TraceClassMethods()
export class FileUtils {
    public static formatBytes(sizeInBytes: number, decimals = 2): string {
        if (sizeInBytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(sizeInBytes) / Math.log(k));

        return `${parseFloat((sizeInBytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }

    public static download(nome: string, tipo: string, base64: string): void {
        void fetch(`data:${tipo};base64,` + base64)
            .then(res => res.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.target = '_blank';
                link.download = nome;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
    }
}
