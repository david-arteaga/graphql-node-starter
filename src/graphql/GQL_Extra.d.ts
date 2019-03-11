declare namespace GQL_Extra {
  interface FileUpload {
    /**
     * @deprecated Use 'createReadStream()' instead
     *
     * @type {NodeJS.ReadableStream}
     * @memberof File
     */
    stream: NodeJS.ReadableStream;
    createReadStream(): NodeJS.ReadableStream;
    filename: string;
    mimetype: string;
    encoding: string;
  }
}
