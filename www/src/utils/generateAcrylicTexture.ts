import * as stackBlurCanvas from "stackblur-canvas";
import * as tinycolor2 from "tinycolor2";

export default function generateAcrylicTexture(
    image?: string,
    tintColor = "#fff",
    tintOpacity = 0.4,
    blurSize = 24
) {
    return new Promise<string>(resolve => {
        const id = `acrylicTexture-${tintColor}-${tintOpacity}`;
        let canvas: HTMLCanvasElement = document.getElementById(id) as any;
        if (!canvas) {
            canvas = document.createElement("canvas");
            canvas.id = id;
            document.body.appendChild(canvas);
        }
        canvas.style.display = "none";
        const context = canvas.getContext("2d");
        const imageNode = new Image();
        imageNode.crossOrigin = "Anonymous";
        imageNode.onload = () => {
            let { naturalWidth, naturalHeight } = imageNode;
            if (naturalWidth > 1000) {
                naturalHeight = naturalHeight / naturalWidth * 1000;
                naturalWidth = 1000;
            }
            if (naturalHeight > 1000) {
                naturalWidth = naturalWidth / naturalHeight * 1000;
                naturalHeight = 1000;
            }


            canvas.width = naturalWidth;
            canvas.height = naturalHeight;
            context!.drawImage(imageNode, 0, 0, naturalWidth, naturalHeight);

            stackBlurCanvas.canvasRGBA(canvas, 0, 0, naturalWidth, naturalHeight, blurSize);

            context!.fillStyle = tinycolor2(tintColor).setAlpha(tintOpacity).toRgbString();
            context!.fillRect(0, 0, naturalWidth, naturalHeight);

            if (HTMLCanvasElement.prototype.toBlob) {
                canvas.toBlob((blob) => {
                    const url = URL.createObjectURL(blob);
                    resolve(url);
                });
            } else if (HTMLCanvasElement.prototype.msToBlob) {
                const blob = canvas.msToBlob();
                const url = URL.createObjectURL(blob);
                resolve(url);
            } else {
                resolve(canvas.toDataURL("image/jpg"));
            }
        };
        imageNode.src = image as string;
    });
}
