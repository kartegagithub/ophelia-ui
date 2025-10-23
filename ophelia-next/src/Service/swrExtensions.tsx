import useSWR from "swr";
import { useCallback } from "react";
import Endpoint from "./endpoint";

export const useEndpointSWRCallback = (endpoint: Endpoint) => {
    return useSWR(endpoint.URL, useCallback(() => endpoint.call(), [endpoint]))
}
export const useEndpointSWR = (endpoint: Endpoint) => {
    return useSWR(endpoint.URL, () => endpoint.call())
}