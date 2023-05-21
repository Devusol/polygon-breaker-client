type ResponseJSON = {
    msg: string,
    success: boolean | undefined,
}

export const httpPost = async <K = any>(path: string, body: {}): Promise<ResponseJSON & Record<string, K>> => {
    const response = await fetch(`http://192.168.0.10:3001/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    return response.json();
}