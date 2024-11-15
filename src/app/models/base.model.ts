export abstract class BaseModel<ResponseInterface, AppInterface> {
    public abstract fromResponse(response: ResponseInterface, ...args: unknown[]): AppInterface;
    public abstract toResponse(): ResponseInterface;
}