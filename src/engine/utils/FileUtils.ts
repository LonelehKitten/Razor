
class FileUtils {
    public static async load(pathname: string) : Promise<string> {
        let reader : ReadableStreamDefaultReader<Uint8Array>;

        await fetch(pathname)
        .then(res => res.body)
        .then(async body => {
            reader = body.getReader()
        })

        return await reader.read()
            .then((stream) => new TextDecoder().decode(stream.value))
    }
}

export default FileUtils;