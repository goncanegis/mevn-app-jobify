interface Query {
  [key: string]: string | number | boolean | null | undefined;
}

interface RequestOptions {
  query?: Query;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
  successMessage?: string;
  errorMessage?: string;
  method?: string;
  body?: any;
  isFormData?: boolean;
}

export const setToken = (token: string) => {
  sessionStorage.setItem("token", token);
};

function _queryBuilder(query: Query): string {
  if (query == null || query === undefined) return "";
  let queryStr = "?";
  Object.keys(query).forEach((key) => {
    if (query[key] !== null && query[key] !== undefined) {
      queryStr +=
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(query[key]!.toString()) +
        "&";
    }
  });
  // remove last & char
  queryStr = queryStr.slice(0, -1);
  return queryStr;
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  const token = sessionStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

class ApiService {
  private async request<T = any>(
    path: string,
    options?: RequestOptions
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    let loading = true;
    let data: T | undefined = undefined;
    let error: string | undefined = undefined;

    const controller = new AbortController();
    const signal = controller.signal;
    const config = useRuntimeConfig();

    const queryString =
      options?.method === "GET" || !options?.method
        ? options?.query
          ? _queryBuilder(options.query)
          : ""
        : "";

    const url = path.startsWith("http")
      ? path
      : config.public.apiBaseurl + path + queryString;

    const headers = JSON.parse(JSON.stringify(buildHeaders()));

    const fetchOptions: RequestInit = {
      method: options?.method || "GET",
      headers,
      signal,
    };

    if (options?.isFormData) {
      delete fetchOptions.headers["Content-Type"];
    }

    if (options?.method && options.method !== "GET" && options.body) {
      fetchOptions.body = options.isFormData
        ? options.body
        : typeof options.body === "string"
        ? options.body
        : JSON.stringify(options.body);
    }

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      if (response.status === 401) {
        sessionStorage.removeItem("token");
      }
      const errorData = await response.json();
      error = errorData;
    } else {
      data = await response.json();
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
      if (options?.successMessage) {
        showToast({ title: options.successMessage, type: "success" });
      }
    }

    loading = false;

    if (error && options?.onError) {
      options.onError(error);
    }

    if (error && options?.errorMessage) {
      showToast({ title: options.errorMessage, type: "error" });
    }

    if (options?.onFinally) {
      options.onFinally();
    }

    return { data, error, loading };
  }

  public get<T = any>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, { ...options, method: "GET" });
  }

  public post<T = any>(
    path: string,
    body: any,
    options?: Omit<RequestOptions, "method">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, { ...options, method: "POST", body });
  }

  public put<T = any>(
    path: string,
    body: any,
    options?: Omit<RequestOptions, "method">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, { ...options, method: "PUT", body });
  }

  public patch<T = any>(
    path: string,
    body: any,
    options?: Omit<RequestOptions, "method">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, { ...options, method: "PATCH", body });
  }

  public patchFormData<T = any>(
    path: string,
    body: FormData,
    options?: Omit<RequestOptions, "method" | "isFormData">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, {
      ...options,
      method: "PATCH",
      body,
      isFormData: true,
    });
  }

  public postFormData<T = any>(
    path: string,
    body: FormData,
    options?: Omit<RequestOptions, "method" | "isFormData">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, {
      ...options,
      method: "POST",
      body,
      isFormData: true,
    });
  }

  public delete<T = any>(
    path: string,
    options?: Omit<RequestOptions, "method" | "body">
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    return this.request(path, { ...options, method: "DELETE" });
  }

  public async exec<T = any>(
    fn: (body?: any) => Promise<T>,
    options?: RequestOptions,
    body?: any
  ): Promise<{ data?: T; error?: string; loading: boolean }> {
    let loading = true;
    try {
      const data = await fn(body);
      loading = false;

      if (options?.onSuccess) {
        options.onSuccess(data);
      }

      if (options?.successMessage) {
        showToast({ title: options.successMessage, type: "success" });
      }

      return { data, loading };
    } catch (error: any) {
      if (options?.onError) {
        options.onError(error);
      }

      if (options?.errorMessage) {
        showToast({ title: options.errorMessage, type: "error" });
      }

      loading = false;
      return { error: error || "An error occurred", loading };
    } finally {
      if (options?.onFinally) {
        options.onFinally();
      }
    }
  }
}

export const apiService = new ApiService();
