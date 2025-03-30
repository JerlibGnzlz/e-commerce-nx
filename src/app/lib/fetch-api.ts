type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

interface FetchOptions {
    method?: HttpMethod
    body?: any
    headers?: Record<string, string>
}

export async function fetchApi<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { method = "GET", body, headers = {} } = options

    const requestOptions: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
        ...(body && { body: JSON.stringify(body) }),
    }

    const response = await fetch(`/api${endpoint}`, requestOptions)

    if (!response.ok) {
        const error = await response.json().catch(() => ({}))
        throw new Error(error.message || "Ocurrió un error al procesar la solicitud")
    }

    return response.json()
}

