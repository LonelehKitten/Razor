
interface IResource {
    create: () => void;
    use: () => void;
    destroy: () => void;
}

export default IResource;