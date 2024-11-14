export abstract class BaseModel<ResponseInterface, AppInterface> {
    public abstract fromResponse(response: ResponseInterface): AppInterface;
    public abstract toResponse(): ResponseInterface;
}