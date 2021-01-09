export default class Advanceable {

  public buffer: Buffer;
  public offset = 0;

  constructor(buffer: Buffer | number, unsafe?: boolean) {
    if (Buffer.isBuffer(buffer)) {
      this.buffer = buffer;
    } else if (typeof buffer === "number") {
      if (unsafe) {
        this.buffer = Buffer.allocUnsafe(buffer);
      } else {
        this.buffer = Buffer.alloc(buffer);
      }
    }
  }

  read(len: number = 1) {
    if (!this.available(len)) return null;
    this.offset += len;
    return this.buffer.slice(this.offset - len, this.offset);
  }

  readByte() {
    return this.read(1)?.[0];
  }

  readUIntBE(len: number) {
    return this.read(len)?.readUIntBE(0, len);
  }

  readUIntLE(len: number) {
    return this.read(len)?.readUIntLE(0, len);
  }

  readIntBE(len: number) {
    return this.read(len)?.readIntBE(0, len);
  }

  readIntLE(len: number) {
    return this.read(len)?.readIntLE(0, len);
  }

  readBigUInt64BE() {
    return this.read(8)?.readBigUInt64BE();
  }

  readBigUInt64LE() {
    return this.read(8)?.readBigUInt64LE();
  }

  readBigInt64BE() {
    return this.read(8)?.readBigInt64BE();
  }

  readBigInt64LE() {
    return this.read(8)?.readBigInt64LE();
  }

  readUInt8() { return this.readUIntBE(1) }

  readUInt16BE() { return this.readUIntBE(2) }
  readUInt24BE() { return this.readUIntBE(3) }
  readUInt32BE() { return this.readUIntBE(4) }
  readUInt40BE() { return this.readUIntBE(5) }
  readUInt48BE() { return this.readUIntBE(6) }

  readUInt16LE() { return this.readUIntLE(2) }
  readUInt24LE() { return this.readUIntLE(3) }
  readUInt32LE() { return this.readUIntLE(4) }
  readUInt40LE() { return this.readUIntLE(5) }
  readUInt48LE() { return this.readUIntLE(6) }

  readInt8() { return this.readIntBE(1) }

  readInt16BE() { return this.readIntBE(2) }
  readInt24BE() { return this.readIntBE(3) }
  readInt32BE() { return this.readIntBE(4) }
  readInt40BE() { return this.readIntBE(5) }
  readInt48BE() { return this.readIntBE(6) }

  readInt16LE() { return this.readIntLE(2) }
  readInt24LE() { return this.readIntLE(3) }
  readInt32LE() { return this.readIntLE(4) }
  readInt40LE() { return this.readIntLE(5) }
  readInt48LE() { return this.readIntLE(6) }

  peek(len: number = 1) {
    if (!this.available(len)) return null;
    return this.buffer.slice(this.offset, this.offset + len);
  }

  advance(len: number = 1): boolean {
    if (!this.available(len)) return false;
    this.offset += len;
    return true;
  }

  available (len: number = 1) {
    return (this.offset + len - 1) < this.buffer.length;
  }

  write (data: Buffer)
  write (data: number[])
  write (data: string, encoding?: BufferEncoding)
  write (data: string | Buffer | number[], encoding?: BufferEncoding) {
    if (Buffer.isBuffer(data)) {
      if (!this.available(data.length)) return false;
      data.copy(this.buffer, this.offset);
      this.offset += data.length;
    } else if (typeof data === "string") {
      let dataLength = Buffer.byteLength(data);
      if (!this.available(dataLength)) return false;
      this.buffer.write(data, this.offset, encoding);
      this.offset += dataLength;
    } else if (Array.isArray(data)) {
      if (!this.available(data.length)) return false;
      for (let i = 0; i < data.length; i++) {
        this.buffer[this.offset + i] = data[i];
      }
      this.offset += data.length;
    }
    return true;
  }
}