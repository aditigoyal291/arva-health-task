export const ApiResponse = (message="", data={}, status=404, success=false) => {
    return {
        message,
        data,
        status,
        success
    }
}