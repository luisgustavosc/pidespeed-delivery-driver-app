export interface ValidateExistingDataModel {
    fieldName: string,
    service: any,
    configId: string, // Only when editing, to validate that the data obtained is not the current one
}
