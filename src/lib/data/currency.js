import { apiRequest } from './backend-request-communicator';

/**
 * Load all available FX rates from the backend.
 * Returns an array of EUR-based rate objects from the Frankfurter API:
 *   [{ date, base: 'EUR', quote: 'USD'|'GBP'|..., rate: number }, ...]
 *
 * Callers should handle the returned promise and store the result in state.
 * Pass the loaded rates to getRate() and buildCurrencyList() in @/lib/currency.
 */

const BASE_URL = "https://placebo-plm-js-backend.onrender.com/api";

export async function loadCurrencies() {
    const response = await fetch(
        `${BASE_URL}/currencies`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || "Failed to load currencies");
    }

    return data;
}
