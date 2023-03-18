import { encode, decode } from 'base64-arraybuffer';
export class DataConvertUtil {

    static base64ToUnit8Array(base64String: string): Uint8Array {
        const arrayBuffer = DataConvertUtil.base64ToArryBuffer(base64String);
        return new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength)
    }

    static unit8ArrayToBase64(unit8ArrayData: Uint8Array): string {
        return DataConvertUtil.arryBufferToBase64(unit8ArrayData.buffer);
    }

    static base64ToArryBuffer(base64String: string): ArrayBuffer {
        try {
            return decode(base64String);
        }
        catch (e) {
            throw e;
        }
    }

    static arryBufferToBase64(buffer: ArrayBuffer): string {
        try {
            return encode(buffer);
        }
        catch (e) {
            throw e;
        }
    }


}